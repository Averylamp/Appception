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

var objects = ['LABEL','BUTTON','MAP', 'LIST','PIN'];

var Appception = React.createClass({


    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(objects),
      };
  },


  render() {
    return (
           <ListView style={styles.listViewStyle}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <TouchableHighlight  style={styles.buttonStyle}><Text style={styles.buttonTextStyle}>{rowData}</Text></TouchableHighlight>}
    />
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

AppRegistry.registerComponent('Appception', () => Appception);
