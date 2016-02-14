import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Button extends Component {
	render() {
		let {highlightProps, textProps, ...other} = this.props;
		return (
		    <TouchableHighlight  {...highlightProps}>
		      <Text {...textProps} />
		    </TouchableHighlight>
		);
	}
}