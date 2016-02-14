var React = require('react-native');
var {
  VibrationIOS
} = React;

const DEFAULT_FG_COLOR = '#2FC3DA'
const DEFAULT_BG_COLOR = '#292249';


export const LabelDefaults = {
	style: {
		color: DEFAULT_FG_COLOR,
		fontSize: 30,
		padding: 20,
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: DEFAULT_BG_COLOR,
		overflow: 'hidden',
		borderRadius: 20,
		borderWidth: 10,
		borderColor: '#111111'
	}
};

export const ButtonDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		underlayColor: DEFAULT_FG_COLOR,
		style: {
			backgroundColor: DEFAULT_BG_COLOR,
		}
	},
	textProps: {
		backgroundColor: DEFAULT_FG_COLOR,
		text: "I'm a button",
		style: {
			backgroundColor: DEFAULT_BG_COLOR,
		}
	}
};

export const MapDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: DEFAULT_BG_COLOR
	},
	textProps: {
		text: "I'm a button"
	}
};

export const TextDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: DEFAULT_BG_COLOR
	},
	textProps: {
		text: "I'm a button"
	}
};


export const ListDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: DEFAULT_BG_COLOR
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