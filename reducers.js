import {TEST_ACTION} from './actions';

export default function testReducer(state, action) {
	switch (action.type) {
		case TEST_ACTION:
			console.log(action);
			return {thingus: action.value};
		default:
			return {thingus: 0};
	}
}