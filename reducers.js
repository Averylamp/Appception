import {TEST_ACTION} from './actions';
import _ from 'lodash';

export default function testReducer(state, action) {
	state = _.clone(state);
	switch (action.type) {
		case TEST_ACTION:
			state[action.key] = action.value;
			return state;
		default:
			return {thingus: "hey"};
	}
}