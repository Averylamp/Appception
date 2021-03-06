var React = require('react-native');
var {
  VibrationIOS
} = React;


const DEFAULT_FG_COLOR = '#d6eff9'
const DEFAULT_BG_COLOR = '#35ace5';
const DEFAULT_BG_COLOR2 = '#154160';
const DEFAULT_FG_COLOR2 = '#d8f0fb';

export const LabelDefaults = {
  text: "LABEL",
	style: {
		color: DEFAULT_FG_COLOR,
		fontSize: 50,
		padding: 35,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: DEFAULT_BG_COLOR,
		overflow: 'hidden',
		borderRadius: 10,
		borderWidth: 0,
		borderColor: DEFAULT_BG_COLOR
	},
};

export const ButtonDefaults = {
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		underlayColor: DEFAULT_FG_COLOR2,
		style: {
			borderRadius: 10,
			overflow: 'hidden'
		}
	},
	textProps: {
		text: "I'm a button",
		style: {
			backgroundColor: DEFAULT_BG_COLOR,
			fontSize: 50,
			padding: 35,
			fontWeight: 'bold',
			textAlign: 'center',
			textAlignVertical: 'center',
			color: '#ffffff'
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
  value: 'Your text here',
  editable: true,
	style: {
		fontSize: 20,
		height: 20,
    padding: 20,
		width: 200,
		borderColor: 'ff0000',
		borderRadius: 2,
		color: '#000000',
		backgroundColor: '#ff0000',
	},
};


export const ListDefaults = {
  textProps: {
		text: "I'm a button"
	},
	highlightProps: {
		onPress: x => VibrationIOS.vibrate(),
		backgroundColor: DEFAULT_BG_COLOR
	},
};


export function getDefaults(key) {
	let map = {
		'LABEL': LabelDefaults,
		'BUTTON': ButtonDefaults,
		'MAP': MapDefaults,
		'TEXTFIELD': TextDefaults,
		'LIST': ListDefaults,
		'PIN': {}
	}

	return map[key];
}
