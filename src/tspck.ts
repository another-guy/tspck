#!/usr/bin/env node

import * as commander from 'commander';

const tspckCommand =
  commander
    .description(`tspck is a tool for dealing with TypeScript packages.`)
    .command(`init`, `Initializes a new package.`)
    .version(`1.0.0-alpha.14`)
    .parse(process.argv);
