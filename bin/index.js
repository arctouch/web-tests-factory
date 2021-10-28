#! /usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');

const utils = require('./utils');

const usage = 'web-tests-factory --framework <framework> --filename <filename> [--methods <name:type> <name:type>]';

// eslint-disable-next-line no-unused-expressions
yargs
  .usage(`\nUsage: ${usage}`)
  .option('f', {
    alias: 'frameworks', describe: 'List all supported frameworks.', type: 'boolean', demandOption: false,
  })
  .option('m', {
    alias: 'methods-pattern', describe: 'List all supported frameworks.', type: 'boolean', demandOption: false,
  })
  .help(true)
  .argv;

(async () => {
  if (yargs.argv.frameworks || yargs.argv.f) {
    utils.showFrameworksList();
    return;
  }

  if (yargs.argv['methods-pattern'] || yargs.argv.m) {
    utils.showMethodsPattern();
    return;
  }

  if (await utils.createFromCli(
    yargs.argv.framework,
    yargs.argv.filename,
    yargs.argv._ ? yargs.argv._.concat(yargs.argv.methods) : yargs.argv.methods,
  )) {
    console.log('   Correct usage:', chalk.blue.bold(usage));
  }
})();
