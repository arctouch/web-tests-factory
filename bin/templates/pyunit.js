const {
  pascalCase,
  snakeCase,
} = require('change-case');

const defaultValues = {
  string: '\'Scenario A is success\'',
  number: 0,
  bool: 'False',
};

module.exports = (filename, methods) => {
  // eslint-disable-next-line no-return-assign
  const formattedMethod = methods.reduce((acc, elm) => ({
    methods: acc.methods.concat({
      name: snakeCase(elm.name),
      type: defaultValues[elm.type] !== undefined ? elm.type : 'string',
      value: defaultValues[elm.type] !== undefined ? defaultValues[elm.type] : defaultValues.string,
    }),
    names: acc.names += `\n  ${snakeCase(elm.name)},`,
    mocks: acc.mocks += `\n  ${snakeCase(elm.name)}Mock,`,
  }), {
    names: '',
    mocks: '',
    methods: [],
  });

  return [
    {
      name: `${filename}/${filename}_test.py`,
      template: `import unittest
from mocks import Mocks
from ${snakeCase(filename)} import ${pascalCase(filename)}

class ${pascalCase(filename)}Test(unittest.TestCase):
    def setUp(self):
        self.test_class = ${pascalCase(filename)}()
        self.mocks = Mocks()

    ${formattedMethod.methods.map(({ name, type }) => `def test_${name}(self):
        self.assertEqual(
          self.test_class.${name}(),
          self.mocks.${name}(),
          'incorrect value, should return ${type}'
        )`).join('\n    ')}

if __name__ == "__main__":
    unittest.main()`,
    },
    {
      name: `${filename}/mocks/__init__.py`,
      template: `class Mocks:
  ${formattedMethod.methods.map(({ name, value }) => `def ${name}(self):
    return ${value}`).join('\n  ')}`,
    },
    {
      name: `${filename}/__init__.py`,
      template: `class ${pascalCase(filename)}:
  ${formattedMethod.methods.map(({ name, value }) => `def ${name}(self):
    return ${value}`).join('\n  ')}`,
    },
  ];
};
