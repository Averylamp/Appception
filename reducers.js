import {TEST_ACTION, CREATE_COMPONENT} from './actions';
import _ from 'lodash';

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
	state = _.clone(state) || [{componentType: "LABEL", id: _.uniqueId('cmp'), props: {style: {color: 'red'}}}];
	switch(action.type) {
		case CREATE_COMPONENT:
			state.push({componentType: action.componentType, id: _.uniqueId('cmp')});
			return state;
		default:
			return state;
	}

}