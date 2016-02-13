'use strict';

import React, {View} from 'react-native';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

// lets us dispatch() functions
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

let createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

let INITIAL_STATE = {}; // TODO populate from persistent store.
let store = createStoreWithMiddleware(reducers, INITIAL_STATE);

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
