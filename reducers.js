import {TEST_ACTION, CREATE_COMPONENT,EDIT_COMPONENT} from './actions';
import _ from 'lodash';
import {getDefaults} from './ComponentDefaults'

export function thingus(state, action) {
	switch (action.type) {
		case TEST_ACTION:
			return action.value;
		default:
			return "hey";
	}
}

// {
// 	componentType: "LABEL",
//  	id: _.uniqueId('cmp'),
//  	props: {
//  		style: {
//  			color: 'red',
//  			fontSize: 20
// 		}
// 	}
// }

export function components(state, action) {
	state = _.cloneDeep(state) || [];
	switch(action.type) {
		case CREATE_COMPONENT:
			let newComponent = {componentType: action.componentType, id: _.uniqueId('cmp'), props: action.props || getDefaults(action.componentType)};
			state.push(newComponent);
			return state;
		case EDIT_COMPONENT:
			var newState = [];
			for (var i = 0; i < state.length;i++){
				if (state[i].id === action.updateID) {
					newState.push(action.value);
				} else {
					newState.push(state[i]);
				}
			}
			return newState;
		default:
			return state;
	}

}
