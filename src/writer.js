import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import * as p from '@clack/prompts';
import pc from 'picocolors';

/**
 * Write rendered content to a file in the target directory.
 * If the file already exists, prompt the user to overwrite or skip.
 */
export async function writeFile(id, content, targetDir = process.cwd(), forceOverwrite = false) {
  const filePath = join(targetDir, id);

  if (existsSync(filePath) && !forceOverwrite) {
    const overwrite = await p.confirm({
      message: `${pc.yellow(id)} already exists. Overwrite?`,
      initialValue: false,
    });
    if (p.isCancel(overwrite) || !overwrite) {
      return { written: false, path: filePath };
    }
  }

  writeFileSync(filePath, content, 'utf8');
  return { written: true, path: filePath };
}
