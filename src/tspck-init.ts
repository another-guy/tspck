#!/usr/bin/env node

import * as commander from 'commander';

import { copyFile } from './file-system/copy-file';
import { initShortDescription } from './i18n';
import { createDirectories } from './steps/create-directories';
import { gitInit } from './steps/git-init';
import { npmInit } from './steps/npm-init';
import { npmInstallPackages } from './steps/npm-install-packages';
import { overrideNpmScripts } from './steps/npm-override-package-scripts';
import { tscInit } from './steps/tsc-init';
import { overrideTsConfig } from './steps/tsc-override-tsconfig';

const initCommand =
  commander
    .description(initShortDescription)
    .option(`-o, --ooo`, `OOOOO.`)
    .parse(process.argv);

// tslint:disable:no-console

// TODO Extract command names

// TODO Extract file paths

// TODO Extract setup states

// TODO colorize the console output

(async () => {

  try {

    await gitInit();
    copyFile(`asset`, `gitignore`, ``, `.gitignore`);
    await npmInit();
    await createDirectories();
    await tscInit();
    await overrideTsConfig();
    copyFile(`asset`, `karma.conf.js`, `.config`, `karma.conf.js`);
    copyFile(`asset`, `tslint.json`, `.config`, `tslint.json`);
    copyFile(`asset`, `settings.json`, `.vscode`, `settings.json`);
    await overrideNpmScripts();
    await npmInstallPackages();

  } catch (error) {
    console.warn(`Critical failure in on of the steps: ${ JSON.stringify(error, null, 2) }`);
  }

})();
