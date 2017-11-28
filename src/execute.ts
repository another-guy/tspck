import { ChildProcess } from 'child_process';

// tslint:disable:no-console

export function execute(cmd: ChildProcess, quiet: boolean = false): Promise<string | Buffer> {
  return new Promise<string | Buffer>((resolve, reject) => {

    cmd.stdout.on('data', data => {
      if (!quiet) console.log(data.toString());
      resolve(data);
    });

    cmd.stderr.on('data', data => {
      if (!quiet) console.error(data.toString());
      reject(data);
    });

  });
}
