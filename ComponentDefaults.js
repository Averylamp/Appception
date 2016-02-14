var React = require('react-native');
var {
  VibrationIOS
} = React;

export const ButtonDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate()
	},
	textProps: {
		text: "I'm a button"
	}
};