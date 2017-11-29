import { ChildProcess, spawn } from 'child_process';

// tslint:disable:no-console

export function executeInteractive(cmd: string, args: string[]): Promise<void> {
  return execute(
    () => spawn(cmd, args, { stdio: 'inherit' }),
    childProcess => { return; },
  );
}

export function executeNonInteractive(cmd: string, args: string[]): Promise<void> {
  return execute(
    () => spawn(cmd, args),
    childProcess => {
      childProcess.stdout.on('data', data => console.log(data.toString()));
      childProcess.stderr.on('data', data => console.error(data.toString()));
    },
  );
}

function execute(
  triggerCommandAsChildProcess: () => ChildProcess,
  bindStreams: (childProcess: ChildProcess) => void,
): Promise<void> {

  return new Promise<void>((resolve, reject) => {

    try {
      const commandProcess = triggerCommandAsChildProcess();
      bindStreams(commandProcess);
      commandProcess
        .on('error', error => reject(error))
        .on('exit', (code, signal) => code !== 0 ? reject({ signal, code }) : resolve());

    } catch (error) {
      throw new Error(`'execute()':\n${ JSON.stringify(error, null, 2) } `);
    }

  });
}
