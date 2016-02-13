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
  Navigator
} from 'react-native';


import { SegmentedControls } from 'react-native-radio-buttons'
let AdaptedText = AppceptionAdapter(Text);
import AppceptionAdapter from './AppceptionAdapter';

import Stateful from './state';
import {testAction} from './actions';

var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];
var vcOptioins = ['VC 1','VC 2','VC 3']

var AddComponent = React.createClass({


  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(objects),
    };
    console.log(this.props);
  },

  _testButton: function (arg) {
    console.log(arg);

  },
  _addSegment: function () {
    console.log("here");
    var newE = "VC "+  vcOptioins.length;
    vcOptioins.push(newE);
    console.log(vcOptioins);
  },
  handlePress(rowData, e) {
    this.props.dispatch(testAction(rowData));
  },
  handleComponentChange(key, val) {
    this.props.dispatch(testAction(key, val));
  },

  render() {

    function setSelectedOption(selectedOption){
        this.setState({
          selectedOption
        });
      };

    return (
      <View>

      <View style={styles.topBarContainer}>
        <View style={{flex:5}}>
          <SegmentedControls
          options={ vcOptioins }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={ this.state.selectedOption }
          style={styles.segmentedControls}
        >
        </SegmentedControls>
        </View>
        <TouchableHighlight style={styles.addSegmentButton} onPress={() => this._addSegment}><Text style={{fontSize:20, backgroundColor:'#77c588',marginRight:10,marginTop:3,color:'white',}}> Add </Text></TouchableHighlight>
      </View>


         <ListView style={styles.listViewStyle}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <TouchableHighlight onPress={this.handlePress.bind(this, rowData)}style={styles.buttonStyle}><AdaptedText style={styles.buttonTextStyle}>{rowData}</AdaptedText></TouchableHighlight>}
        />
        <Text>{this.props.thingus}</Text>

       <Text style={{color: this.props.color}}>
        Input a hex color for me: {this.props.color}
       </Text>
        <TextInput
          value={this.props.color}
          onChangeText={this.handleComponentChange.bind(this, 'color')}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
       />
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
  listViewStyle: {
  },
  buttonStyle: {
    height:70,
    backgroundColor:'#2196f3',
    borderWidth: 10,
    borderTopWidth:5,
    borderBottomWidth:5,
    borderRadius: 6,
    shadowOffset:{
      height:1,
      width:1
    },
    borderRadius:15,
    borderColor: 'white',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: 18,
    backgroundColor:'transparent',
    marginTop:17,
    fontFamily:'Geeza Pro',
    color:'white'
  },
  vcButtonStyle: {
    backgroundColor:'blue',
    height: 100,
    flexDirection:'row',
    borderRadius: 20,
    flex: 0.3,
  },
  vcTextStyle:{

  },

  topBarContainer: {
    marginTop: 40,
    marginLeft: 10,
    flex:1,
    flexDirection: 'row'
  },

  segmentedControls: {
    flex:1,
    //height:40,
    flexDirection:'row',
    //alignItems:'center',
    //flex: 4,
    },
  addSegmentButton: {
    flex:1,

    //flexDirection:'row',
    alignItems:"flex-end",
  }
});

module.exports = Stateful(AddComponent);
