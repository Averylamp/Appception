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
import _ from 'lodash';


import { SegmentedControls } from 'react-native-radio-buttons';
import {connect} from 'react-redux';
let AdaptedText = AppceptionAdapter(Text);
import AppceptionAdapter from './AppceptionAdapter';
var FloatLabelTextInput = require('react-native-floating-label-text-input');
var Spinner = require('rn-spinner');
import Stateful from './state';
import {editComponent} from './actions';
const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

let Window = Dimensions.get('window');
var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];

var typeForProp = {
  'color': 'color',
  'backgroundColor': 'color',
  'text': 'text',
  'borderColor': 'color',
  'borderWidth': 'number',
  'borderRadius': 'number',
};

var PropertiesInspector = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(objects),
      vcOptions: ['View 1','View 2'],
      canada: '',
      rValue:this._hexToRgb(this.props.cmp.props.style.color).r,
      gValue:this._hexToRgb(this.props.cmp.props.style.color).g,
      bValue:this._hexToRgb(this.props.cmp.props.style.color).b,
    };
    console.log(this.props);
  },

  componentDidMount() {
   updatePosition(this.refs['SELECT1']);
   updatePosition(this.refs['OPTIONLIST']);
 },
 _save() {
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
    var options = [1,2,3,4];
    return (
      <ScrollView>
        <View style={{marginTop:15, flex:1}} />
        <TouchableHighlight style={styles.doneButton} onPress={() => this._save()}><Text style={styles.doneText}>Done</Text></TouchableHighlight>

        {this.renderControl()}
          <Text>Selected provicne of Canada: {this.state.canada}</Text>
            <OptionList ref="OPTIONLIST"/>
        <Select
            ref="SELECT1"
            optionListRef={this._getOptionList}
            defaultValue="Select an action ..."
            onSelect={this._canada}>
            {options.map(x => <Option>{x}</Option>)}
          </Select>


      </ScrollView>

    );
  },

  renderControl() {
    var items = this.props.cmp.props;
    var styleItems = this.props.cmp.props.style;
    var allProps = _.extend(items, styleItems);
    var self = this;
    console.log(allProps);
    return (
      <View style={{flex:1}}>
      {_.map(allProps, function(value,key) {
        console.log(value);
        if (key != 'style') {
          var type = typeForProp[key];
          switch (type) {
            case 'text':
              return self.addTextValueField(key,value, self.props.cmp);
            case 'color':
              return self.addColorValueField(key,value, self.props.cmp);
            case 'number':
              return self.addNumberValueField(key,value, self.props.cmp);
            default:
              return null;
          }
        }
      })
      }
      </View>
    );
  },

  addTextValueField(name,defaultValue) {
    return (<View style={{marginBottom:10}}>
      <FloatLabelTextInput
        style={styles.textFieldStyle}
        placeHolder={defaultValue}
        value={name}
        noBorder
      />
    </View>)
  },

  addColorValueField(name,defaultValue, component){
    var colorL = this._hexFromRGB();
    var _this = this;
    function updateColor(key) {
      return function(val) {
        _this.setState({key: val});
        let newObj = _.clone(component);
        newObj.props.style[name] = _this._hexFromRGB();
        _this.props.dispatch(editComponent(component.id, newObj));
      }
    }

    return(
      <View>
      <View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Red Value: {Math.round(this.state.rValue)}</Text>
          <SliderIOS onValueChange={updateColor('rValue')}
            minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} minimumTrackTintColor='red' value={this.state.rValue} />
      </View>
      <View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Green Value: {Math.round(this.state.gValue)}</Text>
          <SliderIOS onValueChange={updateColor('gValue')}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} minimumTrackTintColor='green' value={this.state.gValue}/>
      </View><View style={styles.containerForSliders}>
        <Text style={styles.colorLabelStyle}>Blue Value: {Math.round(this.state.bValue)}</Text>
          <SliderIOS onValueChange={updateColor('bValue')}
              minimumValue={0} maximumValue={255} style={styles.colorSliderStyle} minimumTrackTintColor='blue' value={this.state.bValue}/>
      </View>
        <View style={{height:50, backgroundColor:colorL}}></View>
      </View>
    )
  },

  addNumberValueField(name, defaultValue){
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
    height:22,
    fontSize:18,
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
