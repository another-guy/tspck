import { executeNonInteractive } from '../process/execute';

export function gitInit(): Promise<void> {
  return executeNonInteractive(`git`, [`init`]);
}
