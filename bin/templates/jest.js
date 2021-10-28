const {
  camelCase,
} = require('change-case');

const defaultValues = {
  string: '\'Scenario A is success\'',
  number: 0,
  boolean: false,
};

module.exports = (filename, methods) => {
  // eslint-disable-next-line no-return-assign
  const formattedMethod = methods.reduce((acc, elm) => ({
    methods: acc.methods.concat({
      name: camelCase(elm.name),
      type: defaultValues[elm.type] ? elm.type : 'string',
      value: defaultValues[elm.type] || defaultValues.string,
    }),
    names: acc.names += `\n  ${camelCase(elm.name)},`,
    mocks: acc.mocks += `\n  ${camelCase(elm.name)}Mock,`,
  }), {
    names: '',
    mocks: '',
    methods: [],
  });

  return [
    {
      name: `tests/${filename}.test.js`,
      template: `import {${formattedMethod.mocks}\n} from './mocks/${filename}';
import {${formattedMethod.names}\n} from '../${filename}';

describe ('Verify ${filename} using mocks', () => {
  ${formattedMethod.methods.map(({ name, type }) => `test(' ${name} should return a ${type} ', () => {
    expect(${name}()).toEqual(${name}Mock());
  });`).join('\n')}
});`,
    },
    {
      name: `tests/mocks/${filename}.js`,
      template: `${formattedMethod.methods.map(({ name, value }) => `export const ${name}Mock = () => ${value};`).join('\n')}\n`,
    },
    {
      name: `${filename}.js`,
      template: `${formattedMethod.methods.map(({ name, value }) => `export const ${name} = () => ${value};`).join('\n')}\n`,
    },
  ];
};
