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

var {
    Accelerometer,
    Gyroscope,
    Magnetometer
} = require('NativeModules');
var {
  DeviceEventEmitter // will emit events that you can listen to
} = React;

var SensorsSample = React.createClass({

  getInitialState() {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false,
    };
  },

  componentDidMount() {
    DeviceEventEmitter.addListener('AccelerationData', function (data) {
      this.setState({
        x: data.acceleration.x.toFixed(5),
        y: data.acceleration.y.toFixed(5),
        z: data.acceleration.z.toFixed(5)
      });
    }.bind(this));
  },

  componentWillUnmount() {
    Accelerometer.stopAccelerometerUpdates();
  },

  handleStart() {
    Accelerometer.startAccelerometerUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop() {
    Accelerometer.stopAccelerometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },

  render() {
    console.log(this.state);
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
          <TouchableHighlight style={{margin: 20}} onPress={this.handleStop}><Text>Stop</Text></TouchableHighlight> :
          <TouchableHighlight style={{margin: 20}} onPress={this.handleStart}><Text>Start</Text></TouchableHighlight>
        }
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

  magicButton: {
    position:'absolute',
    right: 50,
    bottom: 50,
  }

});

module.exports = SensorsSample;
