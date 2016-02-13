//Define actions on the store here
export const TEST_ACTION       = "TEST_ACTION";
export function testAction(value) {
	return {type: TEST_ACTION, value};
}

