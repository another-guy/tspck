import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';

export function copyFile(
  srcDir: string,
  srcFile: string,
  destDir: string,
  destFile: string,
): void {
  const assetSourcePath = resolve('.', srcDir, srcFile);
  const assetDestinationPath = resolve(destDir, destFile);
  createReadStream(assetSourcePath).pipe(createWriteStream(assetDestinationPath));
}
