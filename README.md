# Tests Factory

This project aims to insert a new folder with a default test on existing projects that aren't using unit tests yet. 

## How to use this project 
1. Download the file `testsFactory.sh`
2. Inside the principal project folder, execute the script : `./testsFactory.sh`
3. Follow the instructions, and define with the related number how framework you need.

## Supported test framework

This project support the following frameworks:

1. Jest
2.  ...

## How to insert a new test framework on this project

1. Insert a new FRAMEWORK_MOCK and FRAMEWORK_TEST. Like on next:


`NEXT_TEST="import {testingMock} from \"./mocks/className\"
describe ('Verify testingMethod using testingMock to validate the scenario ABC', () => {
	test(' testingMock validate scenario A ', () => {
		expect(testingMethod(testingMock)).toEqual(\"Scenario A is success\");
	});
});"`

`NEXT_MOCK="const testingMock= \"Scenario A is success\";"`


2. Insert a new if, with all the information that is necessary for create this new test.

`if FRAMEWORK_REFERENCE_NUMBER=1; then
  FRAMEWORK_NAME="Jest"
  TEST_FOLDER="tests"
  TEST_MOCK_FOLDER="tests/mocks"
  TEST_FILE="tests/className.test.js"
  MOCK_FILE="tests/mocks/classNameMock.js"
  FRAMEWORK_MOCK=NEXT_MOCK
  FRAMEWORK_TEST=NEXT_TEST
fi`

3. On this project, insert your new test inside the folder: **defaultTests/yourFrameworkName**. This will not do anything, it is just to have an easy way for seeing all the tests inside the script. 

4. This is all! Your new test could be producted using the factoryTests script ! :)
