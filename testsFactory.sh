# MIT License

# Copyright (c) 2021 ArcTouch LLC

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

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

