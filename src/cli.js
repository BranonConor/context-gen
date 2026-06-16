import * as p from '@clack/prompts';
import pc from 'picocolors';
import { fetchIndex, fetchTemplate } from './registry.js';
import { selectTemplates, runQuestionnaire } from './prompt.js';
import { render } from './render.js';
import { writeFile } from './writer.js';

const REGISTRY_URL = 'https://raw.githubusercontent.com/BranonConor/context-registry/main/registry';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--all') args.all = true;
    else if (arg === '--yes' || arg === '-y') args.yes = true;
    else if (arg === '--offline') args.offline = true;
    else if (arg === '--list') args.list = true;
    else if (arg === '--files' && argv[i + 1]) {
      args.files = argv[++i].split(',').map(s => s.trim());
    } else if (arg === '--category' && argv[i + 1]) {
      args.category = argv[++i];
    } else if (arg === '--update' && argv[i + 1]) {
      args.update = argv[++i];
    } else if (arg === '--registry' && argv[i + 1]) {
      args.registry = argv[++i];
    }
  }
  return args;
}

export async function run() {
  const args = parseArgs(process.argv.slice(2));

  p.intro(pc.bgCyan(pc.black(' context-gen ')) + pc.dim(' — generate context files for AI agents'));

  const spinner = p.spinner();
  spinner.start('Fetching latest conventions from registry');

  let index;
  try {
    index = await fetchIndex(args.offline);
    spinner.stop(pc.green('Registry loaded') + pc.dim(` (${index.templates.length} templates available)`));
  } catch (err) {
    spinner.stop(pc.red('Could not reach registry — using offline snapshot'));
    index = await fetchIndex(true);
  }

  // --list: just show available templates
  if (args.list) {
    p.note(
      index.templates
        .map(t => `${pc.bold(t.id.padEnd(20))} ${pc.dim(t.description)}${t.trending ? pc.yellow(' ⚡') : ''}`)
        .join('\n'),
      'Available templates'
    );
    p.outro('Run ' + pc.cyan('npx context-gen') + ' to generate files.');
    return;
  }

  // determine which templates to generate
  let selectedIds;
  if (args.all) {
    selectedIds = index.templates.map(t => t.id);
  } else if (args.files) {
    selectedIds = args.files;
  } else if (args.category) {
    selectedIds = index.templates.filter(t => t.category === args.category).map(t => t.id);
    if (selectedIds.length === 0) {
      p.log.error(`No templates found for category: ${args.category}`);
      process.exit(1);
    }
  } else {
    selectedIds = await selectTemplates(index);
  }

  // process each selected template
  const sharedAnswers = {};
  const results = [];

  for (const id of selectedIds) {
    p.log.step(pc.bold(id));

    const spinner2 = p.spinner();
    spinner2.start(`Fetching ${id} template`);
    let templateData;
    try {
      templateData = await fetchTemplate(id, args.offline);
      spinner2.stop();
    } catch (err) {
      spinner2.stop(pc.red(`Failed to fetch ${id}: ${err.message}`));
      results.push({ id, written: false, error: err.message });
      continue;
    }

    const { meta, template } = templateData;

    // run questionnaire (or skip with --yes)
    let answers = { ...sharedAnswers };
    if (!args.yes && meta.questions?.length > 0) {
      answers = await runQuestionnaire(meta, sharedAnswers);
      // merge new answers back to shared pool
      Object.assign(sharedAnswers, answers);
    } else {
      // use defaults for all questions
      for (const q of (meta.questions || [])) {
        if (!(q.key in answers)) {
          answers[q.key] = q.default || '';
        }
      }
    }

    const content = render(template, answers);
    const result = await writeFile(id, content, process.cwd(), args.yes);
    results.push({ id, ...result });
  }

  // summary
  p.log.message('');
  for (const r of results) {
    if (r.error) {
      p.log.error(`${r.id} — ${r.error}`);
    } else if (r.written) {
      p.log.success(`${pc.bold(r.id)} generated`);
    } else {
      p.log.warn(`${pc.bold(r.id)} skipped`);
    }
  }

  p.outro(pc.green('Done! ') + pc.dim('Add these files to your repository and commit them.'));
}
