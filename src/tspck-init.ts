#!/usr/bin/env node

import { ChildProcess, spawn } from 'child_process';
import * as commander from 'commander';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { execute } from './execute';
import { initShortDescription } from './i18n';

const initCommand =
  commander
    .description(initShortDescription)
    .option(`-o, --ooo`, `OOOOO.`)
    .parse(process.argv);

// tslint:disable:no-console
(async () => {

  try {
    const gitInit = spawn(`git`, [`init`]);
    const gitInitResult = await execute(gitInit);
    createReadStream(resolve(__dirname, `assets`, `.gitignore`)).pipe(createWriteStream('.gitignore'));
  } catch (error) {
    throw new Error(error);
  }

})();
