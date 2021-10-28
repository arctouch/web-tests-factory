const {
  pascalCase,
  snakeCase,
} = require('change-case');

const defaultValues = {
  string: '\'Scenario A is success\'',
  number: 0,
  bool: 'false',
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
      name: `spec/${filename}_spec.rb`,
      template: `require "./${snakeCase(filename)}.rb"
require "./mocks/${snakeCase(filename)}_mock.rb"

describe ${pascalCase(filename)} do
  ${formattedMethod.methods.map(({ name, type }) => `describe "#${name}" do
    before do
      @test_class = ${pascalCase(filename)}.new()
      @mocks = ${pascalCase(filename)}Mock.new()
    end

    it "should return a value of type ${type}" do
      expect(@test_class.${name}).to eq(@mocks.${name})
    end
  end`).join('\n  ')}
end`,
    },
    {
      name: `mocks/${filename}_mock.rb`,
      template: `class ${pascalCase(filename)}Mock
  ${formattedMethod.methods.map(({ name, value }) => `def ${name}
    return ${value}
  end`).join('\n  ')}
end`,
    },
    {
      name: `${filename}.rb`,
      template: `class ${pascalCase(filename)}
    ${formattedMethod.methods.map(({ name, value }) => `def ${name}
    return ${value}
  end`).join('\n  ')}
end`,
    },
  ];
};
