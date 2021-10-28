const {
  pascalCase,
  snakeCase,
} = require('change-case');

module.exports = (filename, methods) => [
  {
    name: `spec/${filename}_spec.rb`,
    template: `require "./${snakeCase(filename)}.rb"
require "./mocks/${snakeCase(filename)}_mock.rb"

describe ${pascalCase(filename)} do
    describe "#test_method" do

        before do
            @test_class = ${pascalCase(filename)}.new()
            @mocks = ${pascalCase(filename)}Mock.new()
        end


        it "puts the ordered book in customer's order history" do
            expect(@test_class.test_method).to eq(@mocks.mock_method_01_result)
        end
    end
end`,
  },
  {
    name: `mocks/${filename}_mock.rb`,
    template: `class ${pascalCase(filename)}Mock
    def mock_method_01_result
        "Scenario A is success"
    end
end`,
  },
  {
    name: `${filename}.rb`,
    template: `class ${pascalCase(filename)}
    def test_method
        "Scenario A is success"
    end
end`,
  },
];
