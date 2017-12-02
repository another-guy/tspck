import { executeNonInteractive } from '../process/execute';

export function tscInit(): Promise<any> {
  return executeNonInteractive(`tsc.cmd`, [`--init`]);
}
