/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import { SegmentedControls } from 'react-native-radio-buttons'

var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];
var vcOptioins = ['VC 1','VC 2','VC 3']

var Appception = React.createClass({


    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(objects),
      };
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
      renderRow={(rowData) => <TouchableHighlight  style={styles.buttonStyle} onPress={() => this._testButton(rowData) }><Text style={styles.buttonTextStyle}>{rowData}</Text></TouchableHighlight>}
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

AppRegistry.registerComponent('Appception', () => Appception);
