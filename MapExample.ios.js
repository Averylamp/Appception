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
  Region,
  ListView,
  TouchableHighlight,
  Dimensions
} from 'react-native';

var MapView = require('react-native-maps');

var MapExample = React.createClass({
  getInitialState() {
    return {
      latitude: 37.78825,
      longitude: -122.170213,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
    };
  },

  onRegionChange(region) {
    this.setState({ region });
  },

  render() {
    return (
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          >
          <MapView.Marker
              key={10}
              coordinate={{
                latitude: 37.78825,
                longitude: -122.170213
              }}
              pinColor="#ff0000"
            >
            <MapView.Callout style={styles.buttonContainer} tooltip>
                <TouchableHighlight style={styles.centralButton}>
                  <Text style={styles.text}>ASDFDD</Text>
                </TouchableHighlight>
            </MapView.Callout>            
          </MapView.Marker>
        </MapView>
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
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    overflow: 'hidden', // https://github.com/facebook/react-native/issues/904
    fontSize:35,
    color:'white'
  }

});

export default MapExample;
