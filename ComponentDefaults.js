var React = require('react-native');
var {
  VibrationIOS
} = React;


const DEFAULT_FG_COLOR = '#d6eff9'
const DEFAULT_BG_COLOR = '#35ace5';
const DEFAULT_BG_COLOR2 = '#154160'; 
const DEFAULT_FG_COLOR2 = '#d8f0fb';

export const LabelDefaults = {
	style: {
		color: DEFAULT_FG_COLOR,
		fontSize: 20,
		padding: 15,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: DEFAULT_BG_COLOR,
		overflow: 'hidden',
		borderRadius: 10,
		borderWidth: 0,
		borderColor: DEFAULT_BG_COLOR
	},
	text: 'What up1!!'
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
			fontSize: 20,
			padding: 15,
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
	style: {
		fontSize: 20,
		height: 20,
		width: 200,
		borderColor: 'ff0000',
		borderRadius: 2,
		color: '#000000',
		backgroundColor: '#ff0000'
	},
	value: 'hat'
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
		'TEXTFIELD': TextDefaults,
		'LIST': ListDefaults,
		'PIN': {}
	}

	return map[key];
}