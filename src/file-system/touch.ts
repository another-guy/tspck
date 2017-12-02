import { close, open } from 'fs';
import { URL } from 'url';

export function touch(path: string | Buffer | URL): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    open(path, 'w', (openError, fd) => {
      if (openError != null) {
        reject(openError);
      } else {
        close(fd, closeError => closeError ? reject(closeError) : resolve());
      }
    });
  });
}
