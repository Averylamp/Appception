var React = require('react-native');
var {
  VibrationIOS
} = React;

export const LabelDefaults = {
	style: {
		color: '#111111',
		fontSize: 30,
		padding: 20,
		backgroundColor: '#55aaaa',
		overflow: 'hidden',
		borderRadius: 20,
		borderWidth: 10,
		borderColor: '#111111'
	}
};

export const ButtonDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: '#ff0000'
	},
	textProps: {
		text: "I'm a button"
	}
};

export const MapDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: '#ff0000'
	},
	textProps: {
		text: "I'm a button"
	}
};

export const TextDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: '#ff0000'
	},
	textProps: {
		text: "I'm a button"
	}
};


export const ListDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: '#ff0000'
	},
	textProps: {
		text: "I'm a button"
	}
};


export function getDefaults(key) {
	let map = {
		'LABEL': LabelDefaults,
		'BUTTON': ButtonDefaults,
		'MAP': MapDefaults,
		'TEXT FIELD': TextDefaults,
		'LIST': ListDefaults,
		'PIN': {}
	}

	return map[key];
}