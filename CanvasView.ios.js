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
import { RadioButtons } from 'react-native-radio-buttons';
var Icon = require('react-native-vector-icons/FontAwesome');
var AddComponent = require('./AddComponent.ios.js');

import Draggable from './Draggable';
import Droppable from './Droppable';
import {connect} from 'react-redux';

import ComponentMap from './ComponentMap';


var CanvasView = React.createClass({
  handleDropped() {
    console.log('dropped on my', arguments);
  },
  gotoAddView() {
    this.props.navigator.push({
      component: AddComponent
    });
  },

  renderComponents() {
    let children = this.props.components.map(function(x, i) {
      let Component = ComponentMap[x.componentType];
      if (x.componentType === 'LABEL') {
        return (<Component {...x.props} key={i}>WHAT UP</Component>);
      }

      return (<Component {...x.props} key={i}/>);
    });

    return children;
  },
  render() {
    function findDropZone(gesture) {
      if (this.refs.drop1.isDropZone(gesture)) {
        return this.refs.drop1;
      } else {
        return false;
      }
    }

    return (
      <View style={styles.container}>
        {this.renderComponents()}
        <Draggable onClick={this.gotoAddView} findDropZone={findDropZone.bind(this)} onDropped={this.handleDropped}>
            <Icon name="dot-circle-o" size={70} color="#900" />
        </Draggable>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

function select(state) {
  return {components: state.components};
}

module.exports = connect(select)(CanvasView);
