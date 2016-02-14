'use strict';

import React, {View} from 'react-native';
import {connect, Provider} from 'react-redux';
import * as reducers from './reducers';
import {createStore, applyMiddleware, combineReducers} from 'redux';

// lets us dispatch() functions
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'


let createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

let INITIAL_STATE = {}; // TODO populate from persistent store.
let store = createStoreWithMiddleware(combineReducers(reducers), INITIAL_STATE);

function select(state) {
  //filter to only expose parts of state
  return state;
}


function Stateful(APP) {
	APP = connect(select)( APP );
	return React.createClass({
		render() {
			return (
			  <Provider store={store}>
			      <APP/>
			  </Provider>
			);			
		}
	});
}

export default Stateful
