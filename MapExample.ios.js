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
  TouchableHighlight,
  Dimensions
} from 'react-native';

var MapView = require('react-native-maps');

var MapExample = React.createClass({
  getInitialState() {
    return {
      latitude: 37.78825,
      longitude: -100.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  },

  onRegionChange(region) {
    this.setState({ region });
  },

  render() {
    return (
      <View style={{flex:1}}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.centralButton}>
            <Text style={styles.text}>ASDFDD</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

let Window = Dimensions.get('window');

const styles = StyleSheet.create({

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    borderRadius: 10,
    backgroundColor: 'black',
    fontSize:35,
    color:'white'
  }

});

module.exports = MapExample;
