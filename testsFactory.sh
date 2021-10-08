#!/bin/bash

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

RED='\033[0;31m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

NEXT_TEST=\
'
import {testingMock} from "./mocks/className"

describe ("Verify testingMethod using testingMock to validate the scenario ABC/", () => {
	test(" testingMock validate scenario A ", () => {
		expect(testingMethod(testingMock)).toEqual("Scenario A is success");
	});
});
'

NEXT_MOCK='const testingMock= "Scenario A is success";'

PYUNIT_TEST="import unittest

from mocks import Mocks

from class_name import ClassName

class ClassNameTest(unittest.TestCase):
    def setUp(self):
        self.test_class = ClassName()
        self.mocks = Mocks()

    def test_method_01(self):
        self.assertEqual(
            self.test_class.test_method(),
            self.mocks.mock_method_01_result(),
            'incorrect value'
        )

if __name__ == \"__main__\":
    unittest.main()
"

PYUNIT_MOCK="class Mocks:
    def mock_method_01_result(self):
        return \"Scenario A is success\"
"

PYUNIT_EXAMPLE="class ClassName:
    def test_method(self):
        return \"Scenario A is success\""

RSPEC_TEST="require \"./class_name.rb\"
require \"./mocks/class_name_mock.rb\"

describe ClassName do
    describe \"#test_method\" do

        before do
            @test_class = ClassName.new()
            @mocks = ClassNameMock.new()
        end


        it \"puts the ordered book in customer's order history\" do
            expect(@test_class.test_method).to eq(@mocks.mock_method_01_result)
        end
    end
end
"

RSPEC_MOCK="class ClassNameMock
    def mock_method_01_result
        \"Scenario A is success\"
    end
end
"

RSPEC_EXAMPLE="class ClassName
    def test_method
        \"Scenario A is success\"
    end
end
"

GO_TEST="package class_name

import \"testing\"

func TestAdd(t *testing.T){

    got := TestMethod()
    want := MockMethod_01Result

    if got != want {
        t.Errorf(\"got %q, wanted %q\", got, want)
    }
}
"

GO_MOCK="package class_name

var  (
    MockMethod_01Result = \"Scenario A is success\"
)
"

GO_EXAMPLE="package class_name

func TestMethod() (string) {
    return \"Scenario A is success\"
}
"

XUNIT_TEST="using System;
using Xunit;

namespace Tests
{
    public class ClassNameTest
    {
        [Fact]
        public void ShouldReturnSuccessMessage()
        {
            var mock = new ClassNameMock();
            Assert.Equal(\"Scenario A is a success\", mock.TestMethod());
        }
    }
}
"

XUNIT_MOCK="namespace Tests
{
    public class ClassNameMock
    {
        public string TestMethod()
        {
            return \"Scenario A is a success\";
        }
    }
}
"

XUNIT_EXAMPLE="<Project Sdk=\"Microsoft.NET.Sdk\">

    <PropertyGroup>
        <TargetFrameworks>net5.0</TargetFrameworks>

        <IsPackable>false</IsPackable>
    </PropertyGroup>

    <ItemGroup>
        <PackageReference Include=\"Microsoft.NET.Test.Sdk\" Version=\"16.9.4\" />
        <PackageReference Include=\"xunit\" Version=\"2.4.1\" />
        <PackageReference Include=\"xunit.runner.visualstudio\" Version=\"2.4.3\">
            <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
            <PrivateAssets>all</PrivateAssets>
        </PackageReference>
        <PackageReference Include=\"coverlet.collector\" Version=\"3.0.2\">
            <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
            <PrivateAssets>all</PrivateAssets>
        </PackageReference>
    </ItemGroup>

</Project>
"

echo -e \
"""
Hello, Welcome to ${ORANGE}Tests Factory${NC}!
With this script you will have a new default folder to implement yout unit tests
${ORANGE}Please, select the Tests Framework you should use on this project: ${NC}
"""

echo -e \
"""1. Jest
2. PyUnit
3. Rspec
4. Go
5. xUnit
"""

echo -ne "${RED}Select Framework >>${NC} "

read FRAMEWORK_REFERENCE_NUMBER

if [[ $FRAMEWORK_REFERENCE_NUMBER == "1" ]]; then
  FRAMEWORK_NAME="Jest"

  TEST_FOLDER="tests"
  TEST_MOCK_FOLDER="tests/mocks"

  TEST_FILE="tests/className.test.js"
  MOCK_FILE="tests/mocks/classNameMock.js"

  FRAMEWORK_MOCK=${NEXT_MOCK}
  FRAMEWORK_TEST=${NEXT_TEST}
elif [[ $FRAMEWORK_REFERENCE_NUMBER == "2" ]]; then
  FRAMEWORK_NAME="pyunit"

  TEST_FOLDER="class_name"
  TEST_MOCK_FOLDER="class_name/mocks"

  TEST_FILE="class_name/class_name_test.py"
  MOCK_FILE="class_name/mocks/__init__.py"
  INIT_FILE="class_name/__init__.py"

  FRAMEWORK_MOCK=${PYUNIT_MOCK}
  FRAMEWORK_TEST=${PYUNIT_TEST}

  INIT_CONTENT=${PYUNIT_EXAMPLE}
elif [[ $FRAMEWORK_REFERENCE_NUMBER == "3" ]]; then
  FRAMEWORK_NAME="rspec"

  TEST_FOLDER="spec"
  TEST_MOCK_FOLDER="mocks"

  TEST_FILE="spec/class_name_spec.rb"
  MOCK_FILE="mocks/class_name_mock.rb"
  INIT_FILE="class_name.rb"

  FRAMEWORK_MOCK=${RSPEC_MOCK}
  FRAMEWORK_TEST=${RSPEC_TEST}

  INIT_CONTENT=${RSPEC_EXAMPLE}
elif [[ $FRAMEWORK_REFERENCE_NUMBER == "4" ]]; then
  FRAMEWORK_NAME="go"

  TEST_FOLDER="spec"
  TEST_MOCK_FOLDER="mocks"

  TEST_FILE="class_name_test.go"
  MOCK_FILE="class_name_mocks.go"
  INIT_FILE="class_name.go"

  FRAMEWORK_MOCK=${GO_MOCK}
  FRAMEWORK_TEST=${GO_TEST}

  INIT_CONTENT=${GO_EXAMPLE}
elif [[ $FRAMEWORK_REFERENCE_NUMBER == "5" ]]; then
  FRAMEWORK_NAME="xunit"

  TEST_FOLDER="Tests"
  TEST_MOCK_FOLDER="Tests/mocks"

  TEST_FILE="Tests/ClassNameTest.cs"
  MOCK_FILE="Tests/mocks/ClassNameMock.cs"
  INIT_FILE="Tests/Tests.csproj"

  FRAMEWORK_MOCK=${XUNIT_MOCK}
  FRAMEWORK_TEST=${XUNIT_TEST}
  INIT_CONTENT=${XUNIT_EXAMPLE}
fi

## Insert new folder and tests
echo -e \
"""
${ORANGE}#${NC} ${FRAMEWORK_NAME} Framework
${ORANGE}##${NC} Create new ${TEST_FOLDER} folder $(mkdir ${TEST_FOLDER})
${ORANGE}###${NC} Create new ${TEST_MOCK_FOLDER} folder $(mkdir ${TEST_MOCK_FOLDER})
${ORANGE}####${NC} Insert default test on tests folder \
$(echo "${FRAMEWORK_TEST}" >> ${TEST_FILE}) \
${ORANGE}#####${NC} Insert default mock on tests/mocks folder \
$(echo "${FRAMEWORK_MOCK}" >> ${MOCK_FILE}) \

$(echo "${INIT_CONTENT}" >> ${INIT_FILE}) \

${GREEN}##############################${NC}
${GREEN} Successfully created! ${NC}
${GREEN}##############################${NC}\
"""
