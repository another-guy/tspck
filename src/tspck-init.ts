#!/usr/bin/env node

// import { ChildProcess, spawn } from 'child_process';
import * as commander from 'commander';

const initCommand =
  commander
    // .description(`tspck is a tool for dealing with TypeScript packages.`)
    .option(`-o, --ooo`, `OOOOO.`)
    .parse(process.argv);

// const gitInit = spawn(`git`, [`init`]);

// // tslint:disable:no-console
// gitInit.stdout.on( 'data', data => {
//   console.log( `stdout: ${data}` );
// });

// gitInit.stderr.on( 'data', data => {
//   console.log( `stderr: ${data}` );
// });

// gitInit.on( 'close', code => {
//   console.log( `child process exited with code ${code}` );
// });
