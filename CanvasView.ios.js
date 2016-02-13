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
import { RadioButtons } from 'react-native-radio-buttons'
var Icon = require('react-native-vector-icons/FontAwesome');
var AddComponent = require('./AddComponent.ios.js');


var CanvasView = React.createClass({

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.magicButton} onPress={()=>this.gotoAddView()}>
          <Icon name="dot-circle-o" size={70} color="#900" />
        </TouchableHighlight>
      </View>
    );
  },

  gotoAddView() {
    this.props.navigator.push({
      component: AddComponent,
    });

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

  magicButton: {
    position:'absolute',
    right: 50,
    bottom: 50
  }

});

//AppRegistry.registerComponent('AddComponent', () => AddComponent);
module.exports = CanvasView;
