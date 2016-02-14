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
  ScrollView,
  Dimensions,
} from 'react-native';


import { SegmentedControls } from 'react-native-radio-buttons';
import {connect} from 'react-redux';
let AdaptedText = AppceptionAdapter(Text);
import AppceptionAdapter from './AppceptionAdapter';
var FloatLabelTextInput = require('react-native-floating-label-text-input');
var Spinner = require('rn-spinner');
import Stateful from './state';
import {testAction} from './actions';
const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

let Window = Dimensions.get('window');
var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];
var CanvasView = require('./CanvasView.ios.js');

var typesForProps = {}

var PropertiesInspector = React.createClass({

  getInitialState: function() {
    // console.log(this.props.cmp.props.style.color);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(objects),
      vcOptions: ['View 1','View 2'],
      canada: '',
      //rValue:this._hexToRgb(this.props.cmp.props.style.color).r,
      //gValue:this._hexToRgb(this.props.cmp.props.style.color).g,
      //bValue:this._hexToRgb(this.props.cmp.props.style.color).b,
    };
    console.log(this.props);
  },

  componentDidMount() {
   updatePosition(this.refs['SELECT1']);
   updatePosition(this.refs['OPTIONLIST']);
 },
 _save() {
  //  this.props.dispatch(actions.editComponent(this.props.cmp.newObj))
  this.props.navigator.pop();
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
  _hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
},
  _hexFromRGB() {
    var hex = '#'
    hex = hex + ('0'+ Math.round(this.state.rValue).toString(16)).slice(-2);
    hex = hex + ('0'+ Math.round(this.state.gValue).toString(16)).slice(-2);
    hex = hex + ('0'+ Math.round(this.state.bValue).toString(16)).slice(-2)
    return hex;
  },
  render() {
    return (
      <ScrollView>
        <View style={{marginTop:15, flex:1}} />
        {this.renderButton()}
          <Text>Selected provicne of Canada: {this.state.canada}</Text>
            <OptionList ref="OPTIONLIST"/>
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
          </Select>

        <TouchableHighlight style={styles.doneButton} onPress={() => this._save()}><Text style={styles.doneText}>Done</Text></TouchableHighlight>

      </ScrollView>

    );
  },

  renderButton() {
    // for (var key of Object.keys(this.props.cmp.props.style)) {
    //   console.log("key:" + key + ";value:" + this.props.cmp.props.style[key]);
    // }
    return (
      <View style={{flex:1,}}>
        {this.addTextValueField("hello","Button Title")}
        {this.addColorValueField("Background Color","defaultValue")}
        {this.addNumberIncrementer("Border Radius",0)}
      </View>
    );
  },

  renderLabel() {
    return (
      <View>
        {this.addTextValueField("hello","Button Title")}

      </View>
    );
  },

  renderMap(){

  },

  addTextValueField(name,defaultValue){
return (<View style={{}}>
      <FloatLabelTextInput
        style={styles.textFieldStyle}
        placeHolder={defaultValue}
        value={name}
        noBorder = {true}
      />
    </View>)
  },

  addColorValueField(name,defaultValue){
    var colorL = this._hexFromRGB();
    return(
      <View><Text style={styles.colorTitleStyle}>{name}</Text>
      <View style={{height:20, backgroundColor:colorL}}></View>
      <View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Red Value: {Math.round(this.state.rValue)}</Text>
          <SliderIOS onValueChange={(rValue) => this.setState({rValue})}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} value={this.state.rValue} minimumTrackTintColor='red' />
      </View>
      <View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Green Value: {Math.round(this.state.gValue)}</Text>
          <SliderIOS onValueChange={(gValue) => this.setState({gValue})}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} value={this.state.gValue} minimumTrackTintColor='green'/>
      </View><View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Blue Value: {Math.round(this.state.bValue)}</Text>
          <SliderIOS onValueChange={(bValue) => this.setState({bValue})}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} value={this.state.bValue} minimumTrackTintColor='blue' />
      </View>

      </View>
    )
  },

  addNumberIncrementer(name, defaultValue){
    return(
      <View style={styles.numberPickerContainer}>
        <Text style={styles.numberPickerText}>{name}</Text>
        <Spinner styles={styles.numberPickerSegment} max={300}
         min={0}
         default={defaultValue}
         color="#f60"
         numColor="#f60"
         onNumChange={(num)=>{console.log(num)}}/>
       </View>

    )
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
  colorTitleStyle: {
    height:24,
    fontSize:20,
    marginLeft:10,
  },
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
  },
  containerForSliders: {
    flexDirection:'row',
  },
  numberPickerText:{
    marginLeft:20,
    flexDirection:'row',
    marginRight:20,
    marginTop:6,
  },
  numberPickerSegment:{
    flexDirection:'row',

  },
  numberPickerContainer:{
    flexDirection:'row',
    marginBottom:10,
    marginTop:5,
  },
  doneButton:{
    alignItems:'center',
    margin: 15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#77c588',
    height:60,
    borderRadius:10,
    shadowOpacity:0.2,
    shadowOffset:{
      x:2,
      y:2
    }
  },
  doneText: {
    fontSize:24,
    marginTop:12,
  }
});

function select(x) {
  return x;
}

module.exports = connect(select)(PropertiesInspector);
