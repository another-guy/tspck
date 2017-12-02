import { mkdir as nativeMkDir } from 'fs';
import { URL } from 'url';

export function mkdir(
  path: string | Buffer | URL,
  mode: string | number | null | undefined = 0o777,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    nativeMkDir(path, mode, error => error ? reject(error) : resolve());
  });
}
