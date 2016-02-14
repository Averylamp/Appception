var React = require('react-native');
var {
  VibrationIOS,
<<<<<<< HEAD
  fetch
} = React;

=======
} = React;

import {sendMessage} from './MessageExample.ios.js';
console.log(sendMessage);
>>>>>>> master
let callInterval = null;

function vibrate() {
	VibrationIOS.vibrate();
}

export const stringsToCallbacks = {
<<<<<<< HEAD
	'phone_message': function phone_message() {console.log('phonem');},
=======
	'phone_message': function phone_message() { sendMessage()},
>>>>>>> master
	'vibration': function vibration() {
		vibrate();
	},
	'api_call': function api_call() {

	},
	'fake_call': function fake_call() {
		vibrate();
		let call = setInterval(vibrate, 1000);
	},
	'stop_vibration': function	 stop_vibration() {
		callInterval(callInterval);
	},
};


export const callbacksToStrings = function(func) {
	return func.name
}