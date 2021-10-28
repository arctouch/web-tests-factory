const {
  snakeCase,
  pascalCase,
} = require('change-case');

const defaultValues = {
  string: '"Scenario A is success"',
  number: 0,
  bool: 'false',
};

const staticTypes = {
  string: 'string',
  number: 'int',
  bool: 'bool',
};

module.exports = (filename, methods) => {
  // eslint-disable-next-line no-return-assign
  const formattedMethod = methods.reduce((acc, elm) => ({
    methods: acc.methods.concat({
      name: pascalCase(elm.name),
      type: staticTypes[elm.type] !== undefined ? staticTypes[elm.type] : 'string',
      value: defaultValues[elm.type] !== undefined ? defaultValues[elm.type] : defaultValues.string,
    }),
    names: acc.names += `\n  ${pascalCase(elm.name)},`,
    mocks: acc.mocks += `\n  ${pascalCase(elm.name)}Mock,`,
  }), {
    names: '',
    mocks: '',
    methods: [],
  });

  return [
    {
      name: `${filename}_test.go`,
      template: `package ${snakeCase(filename)}

import "testing"

${formattedMethod.methods.map(({ name, type }) => `func Test${name}(t *testing.T) {
  got := ${name}()
  want := Mock_${name}

  if got != want {
      t.Errorf("got %v, wanted %v, of type %s", got, want, "${type}")
  }
}`).join('\n  ')}
`,
    },
    {
      name: `${filename}_mocks.go`,
      template: `package ${snakeCase(filename)}

var  (
  ${formattedMethod.methods.map(({ name, value }) => `Mock_${name} = ${value}`).join('\n  ')}
)`,
    },
    {
      name: `${filename}.go`,
      template: `package ${snakeCase(filename)}
${formattedMethod.methods.map(({ name, value, type }) => `func ${name}() ${type} {
  return ${value}
}`).join('\n')}
`,
    },
  ];
};
