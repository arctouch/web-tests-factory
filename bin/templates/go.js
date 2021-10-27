const {
  snakeCase,
} = require('change-case');

module.exports = (filename) => [
  {
    name: `${filename}_test.go`,
    template: `package ${snakeCase(filename)}

import "testing"

func TestAdd(t *testing.T){

    got := TestMethod()
    want := MockMethod_01Result

    if got != want {
        t.Errorf("got %q, wanted %q", got, want)
    }
}`,
  },
  {
    name: `${filename}_mocks.go`,
    template: `package ${snakeCase(filename)}

var  (
    MockMethod_01Result = "Scenario A is success"
)`,
  },
  {
    name: `${filename}.go`,
    template: `package ${snakeCase(filename)}

func TestMethod() (string) {
    return "Scenario A is success"
}`,
  },
];
