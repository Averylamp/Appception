import React, {
  Component,
  StyleSheet,
  SliderIOS,
  View,
  Text,
} from 'react-native';
import _ from 'lodash';

export default class ColorPicker extends Component {
  _hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    } : null;
  }
  _hexFromRGB(clr) {
    var hex = '#'
    hex = hex + ('0'+ Math.round(clr.red).toString(16)).slice(-2);
    hex = hex + ('0'+ Math.round(clr.green).toString(16)).slice(-2);
    hex = hex + ('0'+ Math.round(clr.blue).toString(16)).slice(-2)
    return hex;
  }
  handleSliderChange(color, val) {
    var currentColor = this._hexToRgb(this.props.color);
    currentColor[color] = val;
    var hex = this._hexFromRGB(currentColor);
    this.props.onChange && this.props.onChange(hex);
  }
  render() {
    var sliders = ['red', 'green', 'blue'];
    var rgb = this._hexToRgb(this.props.color);
    return (<View>

      <View style={{height:25, backgroundColor:this.props.color}} />
      {sliders.map(function(v, i) {
        return (
          <View key={i} style={styles.containerForSliders}>
            <Text style={styles.colorLabelStyle}>{v} Value: {Math.round(rgb[v])}</Text>
            <SliderIOS
              onSlidingComplete={this.handleSliderChange.bind(this, v)}
              minimumValue={0}
              maximumValue={255}
              style={styles.colorSliderStyle}
              minimumTrackTintColor={v}
              value={rgb[v]}
            />
          </View>
        );
      }.bind(this))}
    </View>)
  }
}

ColorPicker.PropTypes = {
  color: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  colorLabelStyle:{
    flex:1,
    marginLeft:20,
    marginTop:13,
    flexDirection:'row',
  },
  colorSliderStyle:{
    flexDirection:'row',
    alignItems:"flex-end",
    // justifyContent:'flex-end',
    flex:1.0,
    marginRight: 20
  },
  containerForSliders: {
    flexDirection:'row',
  }
});
