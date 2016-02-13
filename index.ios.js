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
  TextInput,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

let AdaptedText = AppceptionAdapter(Text);

import AppceptionAdapter from './AppceptionAdapter';
import EditView from './EditView';

import Stateful from './state';
import {testAction} from './actions';

var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];

var Appception = React.createClass({


  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(objects),
    };
  },

  handlePress(rowData, e) {
    this.props.dispatch(testAction(rowData));
  },
  handleComponentChange(key, val) {
    this.props.dispatch(testAction(key, val));
  },

  render() {
    return (
      <View>
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
    borderTopWidth: 50
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
  }
});

AppRegistry.registerComponent('Appception', () => Stateful(Appception));
