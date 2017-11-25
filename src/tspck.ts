#!/usr/bin/env node

import * as commander from 'commander';

const cmd =
  commander
    .description(`tspck is a tool for dealing with TypeScript packages.`)
    .command(`init`, `Initializes a new package.`)
    .version(`1.0.0-alpha.3`)
    .parse(process.argv);
