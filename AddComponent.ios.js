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

import { SegmentedControls } from 'react-native-radio-buttons';
import {connect} from 'react-redux';

import {testAction, createComponent} from './actions';

var objects = ['LABEL','BUTTON','MAP','TEXTFIELD', 'LIST','PIN'];

var AddComponent = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(objects),
      vcOptions: ['View 1','View 2'],
      selectedOption: "View 1"
    };
  },

  _testButton: function (arg) {
    console.log(arg);
  },

  _addSegment: function () {
    var newE = "View "+ (this.state.vcOptions.length + 1);
    this.state.vcOptions.push(newE);
    this.setState({
      vcOptions: this.state.vcOptions,
    })
  },
  handlePress(rowData, e) {
    this.props.dispatch(createComponent(rowData));
    this.props.navigator.pop();
  },
  handleComponentChange(key, val) {
    this.props.dispatch(testAction(key, val));
  },
  setSelectedOption(selectedOption) {
    this.setState({selectedOption});
  },

  _done: function(){
    this.props.navigator.pop();
  },

  render() {

    return (
      <View>
        <View style={styles.topBarContainer}>
          <View style={{flex:5}}>
            <SegmentedControls
              options={ this.state.vcOptions }
              onSelection={ this.setSelectedOption }
              selectedOption={ this.state.selectedOption }
              style={styles.segmentedControls}
            >
          </SegmentedControls>
          </View>
          <TouchableHighlight style={styles.addSegmentButton} onPress={() => this._addSegment()}>
              <Text style={{fontSize:20, backgroundColor:'#77c588',marginRight:10, marginLeft:10, marginRight: 25, color:'white', borderRadius:10}}> + </Text>
          </TouchableHighlight>
        </View>


        <ListView style={styles.listViewStyle}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <TouchableHighlight onPress={this.handlePress.bind(this, rowData)}style={styles.buttonStyle}><Text style={styles.buttonTextStyle}>{rowData}</Text></TouchableHighlight>}
        />
        <View style={{marginLeft:20, marginRight:20}}>
        </View>
        <TouchableHighlight style={styles.doneButton} onPress={() => this._done()}><Text style={styles.doneText}>Done</Text></TouchableHighlight>

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
    //borderWidth: 10,
    //borderTopWidth:5,
    //borderBottomWidth:5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 6,
    marginBottom: 6,

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
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor:'transparent',
    marginTop:17,
    fontFamily:'Arial',
    color:'white'
  },
  vcButtonStyle: {
    backgroundColor:'blue',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 6,
    height: 120,
    flexDirection:'row',
    borderRadius: 20,
    flex: 0.3,
  },
  vcTextStyle:{
    fontFamily:'Arial',
    fontSize:18,
    fontWeight: 'bold',
    flex: 0.3,
    color:'white',
  },

  topBarContainer: {
    marginTop: 40,
    marginBottom: 6,
    marginLeft: 20,
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
    fontFamily:'Arial',
    fontSize:34,
    fontWeight: 'bold',
    marginTop:10,
    color:'white',
  }
});

function select(x) {
  return x;
}

module.exports = connect(select)(AddComponent);
