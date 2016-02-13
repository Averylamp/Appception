//Define actions on the store here
export const TEST_ACTION       = "TEST_ACTION";
export const CREATE_COMPONENT  = "CREATE_COMPONENT";
export function testAction(key, value) {
	return {type: TEST_ACTION, key, value};
}

export function createComponent(componentType) {
	return {type: CREATE_COMPONENT, componentType};
}