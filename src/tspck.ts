#!/usr/bin/env node

import * as commander from 'commander';
import { initShortDescription } from './i18n';
import { VERSION } from './version';

const tspckCommand =
  commander
    .description(`tspck is a tool for dealing with TypeScript packages.`)
    .command(`init`, initShortDescription)
    .version(VERSION)
    .parse(process.argv);
