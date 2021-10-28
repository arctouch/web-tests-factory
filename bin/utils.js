const chalk = require('chalk');
const files = require('./helpers/file');
const methodsExtractor = require('./helpers/methods');

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

function showMethodsPattern() {
  console.log(chalk.magenta.bold('Methods patterns'));
  console.log(`
    ${chalk.yellow.bold('method_name')}:${chalk.blue.italic('method_type')}

  ${chalk.magenta.bold('Possible types:')}
    ${chalk.yellow.bold('number')}
    ${chalk.yellow.bold('string')}
    ${chalk.yellow.bold('bool')}

  ${chalk.magenta.bold('Example:')}
    ${chalk.yellow.bold('say_hello')}:${chalk.blue.italic('string')} ${chalk.yellow.bold('get_age')}:${chalk.blue.italic('number')} ${chalk.yellow.bold('is_active')}:${chalk.blue.italic('bool')}
  `);
}

async function createFromCli(framework, filename, methods) {
  let methodsFromCli = [];

  if (Array.isArray(methods)) {
    methodsFromCli = methods;
  } else if (typeof methods === 'string') {
    methodsFromCli = methods.split(' ');
  } else {
    methodsFromCli = ['testingMock:string'];
  }

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

  const templateFiles = template(filename, methodsExtractor(methodsFromCli));

  for (let i = 0; i < templateFiles.length; i += 1) {
    const file = templateFiles[i];

    const filePath = file.name;
    const fileContent = file.template;

    console.log(chalk.green.bold(`Creating file: ${filePath}`));
    // eslint-disable-next-line no-await-in-loop
    await files.createDirectoryAndFile(filePath, fileContent);
  }

  return 0;
}

module.exports = { showFrameworksList, createFromCli, showMethodsPattern };
