import { writeFile as writeFileNative } from 'fs';
import { URL } from 'url';

export function writeFile(
  path: string | number | Buffer | URL,
  data: any,
): Promise<any> {
  return new Promise((resolve, reject) => {
    writeFileNative(path, data, error => error ? reject(error) : resolve());
  });
}
