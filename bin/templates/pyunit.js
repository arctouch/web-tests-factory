const {
  pascalCase,
  snakeCase,
} = require('change-case');

module.exports = (filename) => [
  {
    name: `${filename}/${filename}_test.py`,
    template: `import unittest

from mocks import Mocks

from ${snakeCase(filename)} import ${pascalCase(filename)}

class ${pascalCase(filename)}Test(unittest.TestCase):
    def setUp(self):
        self.test_class = ${pascalCase(filename)}()
        self.mocks = Mocks()

    def test_method_01(self):
        self.assertEqual(
            self.test_class.test_method(),
            self.mocks.mock_method_01_result(),
            'incorrect value'
        )

if __name__ == "__main__":
    unittest.main()`,
  },
  {
    name: `${filename}/mocks/__init__.py`,
    template: `class Mocks:
    def mock_method_01_result(self):
        return "Scenario A is success"`,
  },
  {
    name: `${filename}/__init__.py`,
    template: `class ${pascalCase(filename)}:
    def test_method(self):
        return "Scenario A is success"`,
  },
];
