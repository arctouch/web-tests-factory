module.exports = (filename) => [
  {
    name: `tests/${filename}.test.js`,
    template: `import {testingMock} from "./mocks/${filename}"

describe ("Verify testingMethod using testingMock to validate the scenario ABC/", () => {
    test(" testingMock validate scenario A ", () => {
        expect(testingMethod(testingMock)).toEqual("Scenario A is success");
    });
});`,
  },
  {
    name: `tests/mocks/${filename}.js`,
    template: 'const testingMock= "Scenario A is success";',
  },
  {
    name: `${filename}.js`,
    template: `export const testingMethod = (word) => {
    return word;
};`,
  },
];
