import { executeInteractive } from '../process/execute';

export function npmInstallPackages(): Promise<void> {
  const npmPackageList = [
    `typescript`,
    `tslint`,
    `karma-typescript`,
    `karma-chrome-launcher`,
    `puppeteer`,
    `karma-htmlfile-reporter`,
    `karma`,
    `@types/mocha`,
    `mocha`,
    `karma-mocha`,
    `@types/chai`,
    `chai`,
    `karma-chai`,
  ];
  return executeInteractive(`npm.cmd`, [`i`, `--SD `, ...npmPackageList]);
}
