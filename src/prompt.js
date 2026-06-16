import * as p from '@clack/prompts';
import pc from 'picocolors';

const CATEGORY_LABELS = {
  agent: 'AGENT CONTEXT',
  culture: 'CULTURE & INCLUSION',
  design: 'DESIGN & ARCHITECTURE',
  quality: 'QUALITY & STANDARDS',
  process: 'PROCESS',
};

/**
 * Group templates by category for the selection menu.
 */
function groupByCategory(templates) {
  const groups = {};
  for (const t of templates) {
    const cat = t.category || 'other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(t);
  }
  return groups;
}

/**
 * Present the multi-select template picker.
 * Returns array of selected template IDs.
 */
export async function selectTemplates(index) {
  const groups = groupByCategory(index.templates);
  const options = [];

  for (const [cat, templates] of Object.entries(groups)) {
    options.push({ label: pc.dim(CATEGORY_LABELS[cat] || cat.toUpperCase()), value: '__group__', group: true });
    for (const t of templates) {
      const trending = t.trending ? pc.yellow(' ⚡ trending') : '';
      options.push({
        value: t.id,
        label: `${pc.bold(t.id.padEnd(18))} ${pc.dim(t.description)}${trending}`,
        hint: t.description,
      });
    }
  }

  const selected = await p.multiselect({
    message: 'Which context files do you want to generate? (space to select)',
    options: options.filter(o => !o.group),
    required: true,
  });

  if (p.isCancel(selected)) {
    p.cancel('Cancelled.');
    process.exit(0);
  }

  return selected;
}

/**
 * Run the per-template questionnaire.
 * Accepts a sharedAnswers map so common keys (e.g. project_name) are pre-filled.
 */
export async function runQuestionnaire(meta, sharedAnswers = {}) {
  const questions = meta.questions || [];
  if (questions.length === 0) return {};

  const answers = { ...sharedAnswers };

  for (const q of questions) {
    // skip if we already have this answer from a previous template
    if (answers[q.key] !== undefined) continue;

    let answer;

    if (q.type === 'text' || q.type === 'textarea') {
      answer = await p.text({
        message: q.prompt,
        placeholder: q.default || '',
        defaultValue: q.default || '',
      });
    } else if (q.type === 'select') {
      answer = await p.select({
        message: q.prompt,
        options: (q.options || []).map(o =>
          typeof o === 'string'
            ? { value: o, label: o }
            : { value: o.value, label: o.label }
        ),
        initialValue: q.default,
      });
    } else if (q.type === 'multiselect') {
      const raw = await p.multiselect({
        message: q.prompt,
        options: (q.options || []).map(o =>
          typeof o === 'string'
            ? { value: o, label: o }
            : { value: o.value, label: o.label }
        ),
        required: q.required || false,
      });
      answer = Array.isArray(raw) ? raw.join(', ') : '';
    } else if (q.type === 'confirm') {
      answer = await p.confirm({ message: q.prompt, initialValue: q.default === 'true' });
    } else if (q.type === 'number') {
      const raw = await p.text({ message: q.prompt, defaultValue: String(q.default || '') });
      answer = raw;
    }

    if (p.isCancel(answer)) {
      p.cancel('Cancelled.');
      process.exit(0);
    }

    answers[q.key] = answer || q.default || '';
  }

  return answers;
}
