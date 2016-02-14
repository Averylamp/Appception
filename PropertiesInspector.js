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
  Switch
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
import {stringsToCallbacks, callbacksToStrings} from './callbacks';
const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];

var typeForProp = {
  'color': 'color',
  'backgroundColor': 'color',
  'text': 'text',
  'borderColor': 'color',
  'borderWidth': 'number',
  'borderRadius': 'number',
  'onPress': 'callback',
  'fontSize': 'number',
  'height': 'number',
  'width': 'number',
  'value': 'text',
  'editable': 'boolean',
  'padding': 'number',
  'margin': 'number',
};



var PropertiesInspector = React.createClass({

  copyPropertyToObject: function(path, val) {
    let newObj = _.cloneDeep(this.props.cmp);
    _.set(newObj, path, _.isFunction(val) ? val : _.clone(val));
    return newObj;
  },

  getPathsFromObject: function(obj, path) {
    path = path || [];
    let result = []
    _.each(obj, function(v, key) {
      if (key in typeForProp) {
        result.push({keys: path.concat(key), type: typeForProp[key]});
      } else if (_.isObject(v)) {
        //recur
        result = result.concat(this.getPathsFromObject(v, path.concat(key)));
      } //else v is a primitive we have to ignore
    }.bind(this));

    return result;
  },

  getValueFromObject(path) {
    return _.get(this.props.cmp, path);
  },


  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(objects),
      vcOptions: ['View 1','View 2'],
    };
  },

  onChange: function(path, val) {
    let key = _.last(path);
    let obj;
    if (key === 'onPress') {
      obj = this.copyPropertyToObject(path, stringsToCallbacks[val]);
      console.log(obj);
    } else {
      obj = this.copyPropertyToObject(path, val);
    }

    this.props.dispatch(editComponent(this.props.cmp.id, obj));

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
  render() {
    return (
      <ScrollView>
        <View style={{marginTop:15, flex:1}} />
        <TouchableHighlight style={styles.doneButton} onPress={() => this._save()}><Text style={styles.doneText}>Done</Text></TouchableHighlight>
        {this.renderControl()}
      </ScrollView>
    );
  },

  renderControl() {
    console.log('rerender!!');
    var paths = this.getPathsFromObject(this.props.cmp);

    var dropdowns = _.remove(paths, path => path.type === 'callback');
    paths = paths.concat(dropdowns);  
    var self = this;
    return <View style={{flex:1}}>
      {
        paths.map(function(path) {
          switch (path.type) {
            case 'text':
              return self.addTextValueField(path.keys);
            case 'color':
              return self.addColorValueField(path.keys);
            case 'number':
              return self.addNumberValueField(path.keys);
            case 'callback':
              return self.addCallbackValueField(path.keys);
            case 'boolean':
              return self.addSwitchValueField(path.keys, self.props.cmp);
            default:
              return null;
          }
        })
      }
    </View>
  },

  addTextValueField(path, defaultValue) {
    let name = _.last(path);
    let id = _.uniqueId('textfield');
    return (<View key={_.uniqueId('key')} style={{marginBottom:10, marginLeft:10}}>
      <FloatLabelTextInput
        ref={id}
        style={styles.textFieldStyle}
        placeHolder={name}
        value={this.getValueFromObject(path)}
        onBlur={function() {
          this.onChange(path, this.refs[id].state.text);
        }.bind(this)}
        noBorder
      />
    </View>)
  },

  addSwitchValueField(path, component, defaultValue) {

    let name = _.last(path);
    let val = this.getValueFromObject(path);

    function onChange(val) {
      let newObj = _.clone(component);
      newObj.props[name] = val;
      console.log(newObj);
      this.props.dispatch(editComponent(component.id, newObj));
    }

    return (
      <View key={_.uniqueId('key')} style={styles.numberPickerContainer}>
        <Text style={styles.numberPickerText}>{name}</Text>
        <Switch style={styles.numberPickerSegment} value={val}
         onValueChange={onChange.bind(this)}/>
      </View>
    );
  },

  addNumberValueField(path, defaultValue) {
    let name = _.last(path);
    let val = this.getValueFromObject(path);
    return(
      <View key={_.uniqueId('key')} style={styles.numberPickerContainer}>
        <Text style={styles.numberPickerText}>{name}</Text>
        <Spinner styles={styles.numberPickerSegment} max={300}
         min={0}
         default={val}
         color="#f60"
         numColor="#f60"
         onNumChange={this.onChange.bind(this, path)}/>
       </View>
    )
  },

  addDropDownMenu(path, options) {
    options = options || [];
    let val = this.getValueFromObject(path);

    let key = _.last(path);
    if (key === 'onPress') {
      val = callbacksToStrings(val);
    }
    return(<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'center'}} key={_.uniqueId('key')} >
      <Text style={{textAlignVertical: 'bottom'}} > Action: {val}</Text>
        <OptionList ref="OPTIONLIST"/>
      <Select
        style={{marginBottom: 100}}
        ref="SELECT1"
        optionListRef={() => this.refs.OPTIONLIST}
        defaultValue={val}
        onSelect={this.onChange.bind(this, path)}>
        {options.map((x,i) => <Option key={i}>{x}</Option>)}
      </Select>
    </View>)
  },

  addColorValueField(path) {
    let name = _.last(path);
    var clr = this.getValueFromObject(path);

    return (<View key={_.uniqueId('key')}>
         <Text style={styles.colorTitleStyle}>{name}</Text>
        <ColorPicker color={clr} onChange={this.onChange.bind(this, path)} />
     </View>);
  },

  addCallbackValueField(path, options) {
    let opts = _.keys(stringsToCallbacks);
    console.log(opts);
    return this.addDropDownMenu(path, opts);
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
    height: 100,
    borderBottomWidth:0,
    borderColor:'white',
    fontWeight: 'bold',
    fontFamily: 'Arial'
  },
  colorTitleStyle: {
    height:22,
    fontSize:18,
    marginLeft: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial'
  },
  numberPickerText:{
    marginLeft:20,
    flexDirection:'row',
    marginRight:20,
    marginTop:6,
    flex:1,
  },
  numberPickerSegment:{
    flexDirection:'row',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  numberPickerContainer:{
    flexDirection:'row',
    marginBottom:10,
    marginTop:5,
    flex:1,
    marginRight: 20
  },

  doneButton:{
    alignItems:'center',
    margin: 15,
    marginLeft:20,
    marginRight:20,
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
    fontWeight: 'bold',
    fontFamily: 'Arial'
  }
});

function select(x, props) {
  return {cmp: _.find(x.components, {id: props.id})};
}

module.exports = connect(select)(PropertiesInspector);
