#!/usr/bin/env node

import * as commander from 'commander';
import { initShortDescription } from './i18n';

const tspckCommand =
  commander
    .description(`tspck is a tool for dealing with TypeScript packages.`)
    .command(`init`, initShortDescription)
    .version(`1.0.0-alpha.16`)
    .parse(process.argv);
