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
  Dimensions,
  Button,
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


let CIRCLE_RADIUS = 50;
let Window = Dimensions.get('window');

const initialPosition = {
    position    : 'absolute',
    top         : Window.height - CIRCLE_RADIUS * 2,
    left        : Window.width - CIRCLE_RADIUS * 2,
};

var CanvasView = React.createClass({
  componentDidMount() {
    this.dropzones = [];
  },
  handleDropped(cmp) {
    if (cmp) {
      this.props.navigator.push({
        component: PropertiesInspector,
        passProps: {cmp}
      });
    }
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
      let refName = 'droppable' + x.id;
      if (x.componentType === 'LABEL') {
        function recalc() {
          _this.refs[refName].recalculate();
        }

        let style = _.clone(x.props.style);
        return (
          <Draggable onDropped={recalc} key={i}>
            <Droppable ref={refName}>
              <Component {...x.props} style={style} >What's up</Component>
            </Droppable>
          </Draggable>
        );
      } else {
        return (
          <Draggable key={i}>
            <Droppable ref={refName}>
              <Component {...x.props} key={i}/>
            </Droppable>
          </Draggable>
        );
      }
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
        <Draggable sticky initialPosition={initialPosition} onClick={this.gotoAddView} findDropZone={findDropZone.bind(this)} onDropped={this.handleDropped}>
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
