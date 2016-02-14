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

var PropertiesInspector = React.createClass({

  getInitialState: function() {
    console.log(this.props.cmp.props.style.color);
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
   this.props.dispatch(actions.editComponent(this.props.cmp.newObj))
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


      </ScrollView>

    );
  },

  renderButton() {
    //console.log(this.props.cmp.props.style.)
    for (var key of Object.keys(this.props.cmp.props.style)) {
      console.log("key:" + key + ";value:" + this.props.cmp.props.style[key]);
    }
    return (
      <View style={{flex:1,}}>
        {this.addTextValueField("hello","Button Title")}
        {this.addColorValueField("name","defaultValue")}
        {this.addColorValueField("name","defaultValue")}
        {this.addColorValueField("name","defaultValue")}
        {this.addColorValueField("name","defaultValue")}
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
return (<View style={{marginBottom:10,}}>
      <FloatLabelTextInput
        style={styles.textFieldStyle}
        placeHolder={defaultValue}
        value={name}
      />
    </View>)
  },

  addColorValueField(name,defaultValue){
    var colorL = this._hexFromRGB();
    return(
      <View>
      <View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Red Value: {Math.round(this.state.rValue)}</Text>
          <SliderIOS onValueChange={(rValue) => this.setState({rValue})}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} value={this.state.rValue} />
      </View>
      <View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Green Value: {Math.round(this.state.gValue)}</Text>
          <SliderIOS onValueChange={(gValue) => this.setState({gValue})}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} value={this.state.gValue}/>
      </View><View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Blue Value: {Math.round(this.state.bValue)}</Text>
          <SliderIOS onValueChange={(bValue) => this.setState({bValue})}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} value={this.state.bValue}/>
      </View>
        <View style={{height:50, backgroundColor:colorL}}></View>
      </View>
    )
  },


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
