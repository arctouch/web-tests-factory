#!/bin/bash
RED='\033[0;31m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

NEXT_TEST="import {testingMock} from \"./mocks/className\"

describe ('Verify testingMethod using testingMock to validate the scenario ABC/', () => {
	test(' testingMock validate scenario A ', () => {
		expect(testingMethod(testingMock)).toEqual(\"Scenario A is success\");
	});
});"

NEXT_MOCK="const testingMock= \"Scenario A is success\";"

echo -e  "\nHello, Welcome to ${ORANGE}Tests Factory${NC}! \nWith this script you will have a new default folder to implement yout unit tests \n"
echo -e  "${ORANGE}Please, select the Tests Framework you should use on this project: ${NC}\n"

echo -e -n "1. Jest\n\n${RED}Select Framework >>${NC} "
read -r FRAMEWORK_REFERENCE_NUMBER

if FRAMEWORK_REFERENCE_NUMBER=1; then
  FRAMEWORK_NAME="Jest"
  TEST_FOLDER="tests"
  TEST_MOCK_FOLDER="tests/mocks"
  TEST_FILE="tests/className.test.js"
  MOCK_FILE="tests/mocks/classNameMock.js"
  FRAMEWORK_MOCK=${NEXT_MOCK}
  FRAMEWORK_TEST=${NEXT_TEST}
fi

## Insert new folder and tests
  echo -e "${ORANGE}#${NC} ${FRAMEWORK_NAME} Framework"
  mkdir ${TEST_FOLDER}
  echo -e "${ORANGE}##${NC} Create new ${TEST_FOLDER} folder"
  mkdir ${TEST_MOCK_FOLDER}
  echo -e "${ORANGE}###${NC} Create new ${TEST_MOCK_FOLDER} folder"
  echo "${FRAMEWORK_TEST}" >> ${TEST_FILE}
  echo -e "${ORANGE}####${NC} Insert default test on tests folder"
  echo "${FRAMEWORK_MOCK}" >> ${MOCK_FILE}
  echo -e "${ORANGE}#####${NC} Insert default mock on tests/mocks folder"
  echo -e "\n${GREEN}##############################${NC}"
  echo -e "${GREEN} Successfully created! ${NC}"
  echo -e "${GREEN}##############################${NC}"

