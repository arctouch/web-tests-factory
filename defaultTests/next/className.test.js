import {testingMethod} from "../className";

import {testingMock} from "./mocks/className";

describe ('Verify testingMethod using testingMock to validate the scenario ABC', () => {
	test('testingMock validate scenario A', () => { 
		expect(testingMethod(testingMock)).toEqual("Scenario A is sucess");
	});
});
