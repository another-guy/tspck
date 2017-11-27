#!/usr/bin/env node

import { ChildProcess, spawn } from 'child_process';
import * as commander from 'commander';
import { initShortDescription } from './i18n';

const initCommand =
  commander
    .description(initShortDescription)
    .option(`-o, --ooo`, `OOOOO.`)
    .parse(process.argv);

const gitInit = spawn(`git`, [`init`]);

// tslint:disable:no-console
gitInit.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

gitInit.stderr.on('data', data => {
  console.log(`stderr: ${data}`);
});

gitInit.on('close', code => {
  console.log(`child process exited with code ${code}`);
});
