# Contributing
You can contribute to this project by inserting a new Test Framework on this Test Factory or reporting bugs.

## How to insert a new test framework on this project
We will assume that this new framework will work on the main existing script struct. If the new framework needs different steps, feel free to adapt this script and suggest changes as a new Pull Request

Based on the implementation for the Jest Framework:

1. On the [testsFactory.sh](testsFactory.sh) file, insert a new FRAMEWORK_MOCK constant and FRAMEWORK_TEST constant.
   > FRAMEWORK_TEST: The default test implementation as a string.
   > FRAMEWORK_MOCK: The default mock example.

```bash
JEST_TEST="import {testingMock} from \"./mocks/className\"
describe ('Verify testingMethod using testingMock to validate the scenario ABC', () => {
	test(' testingMock validate scenario A ', () => {
		expect(testingMethod(testingMock)).toEqual(\"Scenario A is successful\");
	});
});"

JEST_MOCK="const testingMock= \"Scenario A is successful\";"
```

2. Insert a new if, with all the information that is necessary for create a new test.

```bash
if FRAMEWORK_REFERENCE_NUMBER=1; then
  FRAMEWORK_NAME="Jest"
  TEST_FOLDER="tests"
  TEST_MOCK_FOLDER="tests/mocks"
  TEST_FILE="tests/className.test.js"
  MOCK_FILE="tests/mocks/classNameMock.js"
  FRAMEWORK_MOCK=JEST_MOCK
  FRAMEWORK_TEST=JEST_TEST
fi
```

3. On this project, insert your new test inside the folder: **defaultTests/yourFrameworkName**. It won't do anything, it is just an example in order to see all the tests available in the script.

4. That is all! Your new test can now be produced using the tests factory script!

## Contributing
Pull requests are appreciated. For major changes, please open an **issue** first to discuss what you would like to change.

<img src="https://pbs.twimg.com/profile_images/1156669334531596293/ufha-qND_400x400.png"  border="0" alt="ArcTouch Icon" height="60"/>  <span style="color:orange"><em>Thank you! Your contribution is really important for us!</em></span> 

<a href="https://www.facebook.com/ArcTouchBrasil/"><img alt="Facebook icon" src="https://img.icons8.com/ios-filled/50/000000/facebook-circled--v1.png" width="30"/></a>
<a href="https://www.linkedin.com/company/arctouch"><img alt="Linkedin icon" src="https://img.icons8.com/ios-filled/50/000000/linkedin-circled--v1.png" width="30"/></a>
<a href="https://twitter.com/arctouch"><img alt="Twitter icon" src="https://img.icons8.com/ios-filled/50/000000/twitter-circled--v1.png" width="30"/></a>
<a href="https://medium.com/arctouch"><img alt="Medium icon" src="https://img.icons8.com/ios-filled/50/000000/medium-logo.png" width="30"/></a>
<a href="https://dribbble.com/arctouch"><img alt="Dribbble icon" src="https://img.icons8.com/dotty/80/000000/dribbble.png" width="30"/></a>
<a href="https://www.instagram.com/arctouchlife/"><img alt="Instagram icon" src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" width="30"/></a>