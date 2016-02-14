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

var AddComponent = require('./AddComponent.ios.js');
var CanvasView = require('./CanvasView.ios.js');
import Stateful from './state';
import {testAction} from './actions';

var Appception = React.createClass({

  render() {
    return (
      <Navigator
        ref={(navigator) => {this.navigator = navigator;}}
        initialRoute={{name: 'Main', index: 0, component: CanvasView}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <Component
        route={route}
        {...route.passProps}
        navigator={navigator}
        topNavigator={navigator}
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
  }
});

AppRegistry.registerComponent('Appception', () => Stateful(Appception));
