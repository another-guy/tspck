#!/usr/bin/env node

import * as commander from 'commander';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';

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

const copyAssetFile =
  (pathPart1: string, pathPart2: string = '') => {
    const assetSourcePath = resolve(__dirname, `assets`, pathPart2 !== '' ? pathPart2 : pathPart1);
    const assetDestinationPath = pathPart2 !== '' ? resolve(pathPart1, pathPart2) : pathPart1;
    console.warn(`${ assetSourcePath } ===> ${ assetDestinationPath }`);
    createReadStream(assetSourcePath).pipe(createWriteStream(assetDestinationPath));
  };

(async () => {

  try {

    await gitInit();
    copyAssetFile(`.gitignore`);
    await npmInit();
    await createDirectories();
    await tscInit();
    await overrideTsConfig();
    copyAssetFile(`.config`, `karma.conf.js`);
    copyAssetFile(`.config`, `tslint.json`);
    copyAssetFile(`.vscode`, `settings.json`);
    await overrideNpmScripts();
    await npmInstallPackages();

  } catch (error) {
    console.warn(`Critical failure in on of the steps: ${ JSON.stringify(error, null, 2) }`);
  }

})();
