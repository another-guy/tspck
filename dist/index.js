#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const cmd = commander
    .description(`tspck is a tool for dealing with TypeScript packages.`)
    .command(`init`, `Initializes a new package.`)
    .version(`1.0.0-alpha.0`)
    .parse(process.argv);
//# sourceMappingURL=index.js.map