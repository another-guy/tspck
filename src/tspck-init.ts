#!/usr/bin/env node

import * as commander from 'commander';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { executeInteractive, executeNonInteractive } from './execute';
import { initShortDescription } from './i18n';

const initCommand =
  commander
    .description(initShortDescription)
    .option(`-o, --ooo`, `OOOOO.`)
    .parse(process.argv);

// tslint:disable:no-console
(async () => {

  try {
    await executeNonInteractive(`git`, [ `init` ]);

    createReadStream(resolve(__dirname, `assets`, `.gitignore`)).pipe(createWriteStream('.gitignore'));

    await executeInteractive(`npm.cmd`, [ `init` ]);
  } catch (error) {
    console.warn(`Critical failure in on of the steps: ${ JSON.stringify(error, null, 2) }`);
  }

})();
