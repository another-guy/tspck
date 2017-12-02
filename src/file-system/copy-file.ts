import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';

export function copyFile(
  srcFile: string,
  srcDir: string,
  destFile: string,
  destDir: string,
): void {
  const assetSourcePath = resolve(__dirname, srcDir, srcFile);
  const assetDestinationPath = resolve(destDir, destFile);
  createReadStream(assetSourcePath).pipe(createWriteStream(assetDestinationPath));
}
