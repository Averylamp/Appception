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
import PropertiesInspector from './PropertiesInspector';
var Icon = require('react-native-vector-icons/FontAwesome');
var AddComponent = require('./AddComponent.ios.js');

import Draggable from './Draggable';
import Droppable from './Droppable';
import {connect} from 'react-redux';

import ComponentMap from './ComponentMap';


var CanvasView = React.createClass({
  componentDidMount() {
    this.dropzones = [];
  },
  handleDropped(cmp) {
    this.props.navigator.push({
      component: PropertiesInspector,
      passProps: {cmp}
    });
  },
  gotoAddView() {
    this.props.navigator.push({
      component: AddComponent
    });
  },

  renderComponents() {
    this.dropzones = [];
    let _this = this;
    let children = this.props.components.map(function(x, i) {
      let Component = ComponentMap[x.componentType];
      if (x.componentType === 'LABEL') {
        return (
          <Droppable key={i} ref={'droppable' + x.id}>
            <Component {...x.props} >WHAT UP</Component>
          </Droppable>
        );
      }

      return (<Component {...x.props} key={i}/>);

    });

    return children;
  },
  render() {
    let children = this.renderComponents();

    function findDropZone(gesture) {
      for(var i = 0; i < children.length; i++) {
        let cmp = this.props.components[i];
        let dropzone = this.refs['droppable' + cmp.id];
        if (dropzone.isDropZone(gesture)) {
          return cmp;
        }
      }
      return false;
    }

    return (
      <View style={styles.container}>
        {children}
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
