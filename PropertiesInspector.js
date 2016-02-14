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
import ColorPicker from './ColorPicker';
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
    };
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
            {options.map((x, i) => <Option key={i}>{(x.toString())}</Option>)}
          </Select>


      </ScrollView>

    );
  },

  renderControl() {
    var items = this.props.cmp.props;
    var styleItems = this.props.cmp.props.style;
    var allProps = _.extend(items, styleItems);
    var self = this;
    return (
      <View style={{flex:1}}>
      {_.map(allProps, function(value,key) {
        if (key != 'style') {
          var type = typeForProp[key];
          switch (type) {
            case 'text':
              return self.addTextValueField(key,value, self.props.cmp, key);
            case 'color':
              return self.addColorValueField(key,value, self.props.cmp, key);
            case 'number':
              return self.addNumberValueField(key,value, self.props.cmp, key);
            default:
              return null;
          }
        }
      })
      }
      </View>
    );
  },

  addTextValueField(name,defaultValue, cmp, key) {
    return (<View key={key} style={{marginBottom:10}}>
      <FloatLabelTextInput
        style={styles.textFieldStyle}
        placeHolder={defaultValue}
        value={name}
        noBorder
      />
    </View>)
  },

  addColorValueField(name, defaultValue, component, key) {
    var clr = (component.props.style && component.props.style[name]) || '#000000';

    function onChange(val) {
      let newObj = _.clone(component);
      newObj.props.style[name] = val;
      this.props.dispatch(editComponent(component.id, newObj));
    }

    return (
      <ColorPicker key={key} color={clr} onChange={onChange.bind(this)} />
    );
  },

  addNumberValueField(name, defaultValue, cmp, key){
    return(
      <View key={key} style={styles.numberPickerContainer}>
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
