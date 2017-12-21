#!/usr/bin/env node

import chalk from 'chalk';
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

const log = (...text: string[]): void => console.log(chalk.cyan(...text));

(async () => {

  log(`Starting tspck init`);

  try {

    log(`Initializing Git`);
    await gitInit();
    log(`Creating a .gitignore file`);
    copyFile(__dirname, `assets`, `gitignore`, ``, `.gitignore`);

    log(`Creating directory structure`);
    await createDirectories();

    log(`Creating karma configuration`);
    copyFile(__dirname, `assets`, `karma.conf.js`, `.config`, `karma.conf.js`);
    log(`Creating tslint configuration`);
    copyFile(__dirname, `assets`, `tslint.json`, `.config`, `tslint.json`);
    log(`Creating vscode configuration`);
    copyFile(__dirname, `assets`, `settings.json`, `.vscode`, `settings.json`);

    log(`Initializing NPM package`);
    await npmInit();
    log(`Installing NPM packages`);
    await npmInstallPackages();
    log(`Overriding NPM scripts`);
    await overrideNpmScripts();

    log(`Initializing TypeScript compiler configuration`);
    await tscInit('./');
    log(`Overriding default TypeScript configuration keys`);
    await overrideTsConfig();

    log(`Creating initial Git commit for generated package`);
    await gitCommit();

  } catch (error) {
    console.warn(`Critical failure in on of the steps: ${ JSON.stringify(error, null, 2) }`);
  }

  log(`tspck init is over now`);

})();
