var React = require('react-native');
var {
  VibrationIOS
} = React;

export const ButtonDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: '#ff0000'
	},
	textProps: {
		text: "I'm a button"
	}
};