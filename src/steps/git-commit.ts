import { executeNonInteractive } from '../process/execute';
import { VERSION } from '../version';

export async function gitCommit() {
  await executeNonInteractive(`git`, [`add`, `.`]);
  await executeNonInteractive(`git`, [`commit`, `-m`, `"Generated package via tspck@${ VERSION }"`]);
}
