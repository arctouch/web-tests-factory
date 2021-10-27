const chalk = require('chalk');
const files = require('./helpers/file');

const jestTemplate = require('./templates/jest');
const pyunitTemplate = require('./templates/pyunit');
const rspecTemplate = require('./templates/rspec');
const goTemplate = require('./templates/go');
const xunitTemplate = require('./templates/xunit');

const frameworksList = {
  jest: jestTemplate,
  pyunit: pyunitTemplate,
  rspec: rspecTemplate,
  go: goTemplate,
  xunit: xunitTemplate,
};

function showFrameworksList() {
  console.log(chalk.magenta.bold('Framework list'));

  const frameworks = Object.keys(frameworksList);

  for (let i = 0; i < frameworks.length; i += 1) {
    console.log(`   > ${frameworks[i]}`);
  }
}

async function createFromCli(framework, filename) {
  const template = frameworksList[framework];

  if (!template) {
    console.log(chalk.red.bold('Framework not found'));
    return 1;
  }

  if (!filename) {
    console.log(chalk.red.bold('Filename not found'));
    return 1;
  }

  console.log(chalk.green.bold('Creating test project'));
  console.log(chalk.green.bold(`Framework: ${framework}`));

  const templateFiles = template(filename);

  for (let i = 0; i < templateFiles.length; i += 1) {
    const key = templateFiles[i];

    const file = templateFiles[key];
    const filePath = file.name;
    const fileContent = file.template;

    console.log(chalk.green.bold(`Creating file: ${filePath}`));
    // eslint-disable-next-line no-await-in-loop
    await files.createDirectoryAndFile(filePath, fileContent);
  }

  return 0;
}

module.exports = { showFrameworksList, createFromCli };
