import { executeInteractive } from '../process/execute';

export function npmInit(): Promise<void> {
  return executeInteractive(`npm.cmd`, [`init`]);
}
