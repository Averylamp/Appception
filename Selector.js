import React, {
  Component,
  View,
  Text
} from 'react-native';

const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

var options = [1,2,3,4];
export default class Selector extends Component {
	render() {
		return (<View>
		    <Text > Select your action: {this.props.selected}</Text>
	        <OptionList ref="OPTIONLIST"/>
			<Select
			width={250}
	        optionListRef={() => this.refs.OPTIONLIST}
			defaultValue="Select a callback"
			onSelect={x => console.log(x)}>
			{options.map((x, i) => <Option key={i}>{x.toString()}</Option>)}
		</Select>
	</View>);
	}
}