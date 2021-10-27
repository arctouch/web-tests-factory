#! /usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');

const utils = require('./utils');

const usage = 'web-tests-factory --framework <framework> --filename <filename>';

// eslint-disable-next-line no-unused-expressions
yargs
  .usage(`\nUsage: ${usage}`)
  .option('frameworks', {
    alias: 'list-frameworks', describe: 'List all supported frameworks.', type: 'boolean', demandOption: false,
  })
  .help(true)
  .argv;

(async () => {
  if (yargs.argv.frameworks || yargs.argv['list-frameworks']) {
    utils.showFrameworksList();
    return;
  }

  if (await utils.createFromCli(yargs.argv.framework, yargs.argv.filename)) {
    console.log('   Correct usage:', chalk.blue.bold(usage));
  }
})();
