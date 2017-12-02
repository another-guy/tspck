import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';

export function copyFile(
  scriptBase: string,
  srcDir: string,
  srcFile: string,
  destDir: string,
  destFile: string,
): void {
  const assetSourcePath = resolve(scriptBase, srcDir, srcFile);
  const assetDestinationPath = resolve(destDir, destFile);
  createReadStream(assetSourcePath).pipe(createWriteStream(assetDestinationPath));
}
