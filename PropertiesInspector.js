'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  Navigator,
  SliderIOS,
} from 'react-native';


import { SegmentedControls } from 'react-native-radio-buttons';
import {connect} from 'react-redux';
let AdaptedText = AppceptionAdapter(Text);
import AppceptionAdapter from './AppceptionAdapter';
var FloatLabelTextInput = require('react-native-floating-label-text-input');
import Stateful from './state';
import {testAction} from './actions';
const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

var Slider = require('react-native-slider');

var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];

var PropertiesInspector = React.createClass({

  getInitialState: function() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(objects),
      vcOptions: ['View 1','View 2'],
      canada: '',
      rValue:100,
      gValue:100,
      bValue:100,
    };
    console.log(this.props);
  },

  componentDidMount() {
   updatePosition(this.refs['SELECT1']);
   updatePosition(this.refs['OPTIONLIST']);
 },

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  },

  _canada(province) {

    this.setState({
      ...this.state,
      canada: province
    });
  },
  _hexFromRGB() {
    var hex = '#'
    hex = hex + ('0'+ Math.round(this.state.rValue).toString(16)).slice(-2);
    console.log(hex);
    hex = hex + ('0'+ Math.round(this.state.gValue).toString(16)).slice(-2);
    hex = hex + ('0'+ Math.round(this.state.bValue).toString(16)).slice(-2)
    return hex;
  },

  render() {

    var colorL = this._hexFromRGB();
    return (
      <View>
        <View style={{marginTop:30,marginBottom:10,}}>
          <FloatLabelTextInput
            style={styles.textFieldStyle}
            placeHolder={"Text"}
            value={"Hello"}
          />
        </View>

        <View style={styles.containerForSliders}>
          <Text style={styles.colorLabelStyle}>Red Value: {Math.round(this.state.rValue)}</Text>
            <SliderIOS onValueChange={(rValue) => this.setState({rValue})}
                minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} />
        </View>
        <View style={styles.containerForSliders}>
          <Text style={styles.colorLabelStyle}>Green Value: {Math.round(this.state.gValue)}</Text>
            <SliderIOS onValueChange={(gValue) => this.setState({gValue})}
                minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} />
        </View><View style={styles.containerForSliders}>
          <Text style={styles.colorLabelStyle}>Blue Value: {Math.round(this.state.bValue)}</Text>
            <SliderIOS onValueChange={(bValue) => this.setState({bValue})}
                minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} />
        </View>
          <View style={{height:100, backgroundColor:colorL}}></View>
        <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList}
            defaultValue="Select a Province in Canada ..."
            onSelect={this._canada}>
            <Option>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>
          <Text>Selected provicne of Canada: {this.state.canada}</Text>
            <OptionList ref="OPTIONLIST"/>

      </View>

    );
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textFieldStyle: {
    fontSize:20,
    borderBottomWidth:0,
    borderColor:'white',
  },
  colorLabelStyle:{
    flex:1,
    flexDirection:'row',
  },
  colorSliderStyle:{
    flexDirection:'row',
    alignItems:"flex-end",
    // justifyContent:'flex-end',
    flex:1.0,
  },
  containerForSliders: {
    flexDirection:'row',
  }
});

function select(x) {
  return x;
}

module.exports = connect(select)(PropertiesInspector);
