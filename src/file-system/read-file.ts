import { readFile as readFileNative } from 'fs';
import { URL } from 'url';

export function readFile(
  path: string | number | Buffer | URL,
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    readFileNative(path, (error, data) => error ? reject(error) : resolve(data));
  });
}
