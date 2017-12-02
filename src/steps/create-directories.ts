import { resolve } from 'path';
import { mkdir } from '../file-system/mkdir';
import { touch } from '../file-system/touch';

export async function createDirectories(): Promise<void> {
  const directories = [`src`, `test`, `.config`, `.vscode`];
  await Promise.all(directories.map(async directory => mkdir(directory)));
  await Promise.all(directories.map(async directory => touch(resolve(directory, `.gitkeep`))));
}
