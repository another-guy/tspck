#!/usr/bin/env node

import * as commander from 'commander';

import { copyFile } from './file-system/copy-file';
import { initShortDescription } from './i18n';
import { createDirectories } from './steps/create-directories';
import { gitCommit } from './steps/git-commit';
import { gitInit } from './steps/git-init';
import { npmInit } from './steps/npm-init';
import { npmInstallPackages } from './steps/npm-install-packages';
import { overrideNpmScripts } from './steps/npm-override-package-scripts';
import { tscInit } from './steps/tsc-init';
import { overrideTsConfig } from './steps/tsc-override-tsconfig';

const initCommand =
  commander
    .description(initShortDescription)
    // .option(`-o, --ooo`, `OOOOO.`)
    .parse(process.argv);

// tslint:disable:no-console

// TODO Extract command names

// TODO Extract file paths

// TODO Extract setup states

// TODO colorize the console output

(async () => {

  try {

    await gitInit();
    copyFile(__dirname, `assets`, `gitignore`, ``, `.gitignore`);

    await createDirectories();
    copyFile(__dirname, `assets`, `karma.conf.js`, `.config`, `karma.conf.js`);
    copyFile(__dirname, `assets`, `tslint.json`, `.config`, `tslint.json`);
    copyFile(__dirname, `assets`, `settings.json`, `.vscode`, `settings.json`);

    await npmInit();
    await npmInstallPackages();
    await overrideNpmScripts();

    await tscInit('./');
    await overrideTsConfig();

    await gitCommit();

  } catch (error) {
    console.warn(`Critical failure in on of the steps: ${ JSON.stringify(error, null, 2) }`);
  }

})();
