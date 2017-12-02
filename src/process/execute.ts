import { ChildProcess, spawn, SpawnOptions } from 'child_process';

// tslint:disable:no-console

export function executeInteractive(cmd: string, args: string[]): Promise<void> {
  return execute(
    () => osSpecificSpawn(cmd, args, { stdio: 'inherit' }),
    childProcess => { return; },
  );
}

export function executeNonInteractive(
  cmd: string,
  args: string[],
  options?: SpawnOptions | undefined,
): Promise<void> {

  return execute(
    () => osSpecificSpawn(cmd, args, options),
    childProcess => {
      childProcess.stdout.on('data', data => console.log(data.toString()));
      childProcess.stderr.on('data', data => console.error(data.toString()));
    },
  );

}

function osSpecificSpawn(
  command: string,
  args?: string[] | undefined,
  options?: SpawnOptions | undefined,
): ChildProcess {

  const winPlatform = /^win/.test(process.platform);
  const sanitizedCommand = winPlatform ? command : command.replace(`.cmd`, ``);
  return spawn(command, args, options);

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
