import { resolve } from 'path';
import { executeNonInteractive } from '../process/execute';

export function tscInit(baseDirectory: string): Promise<any> {
  const localTscPath = resolve(baseDirectory, `node_modules`, `typescript`, `bin`, `tsc`);
  return executeNonInteractive(`node`, [localTscPath, `--init`]);
}
