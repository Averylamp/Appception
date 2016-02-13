import React,{
    Component,
    StyleSheet,
    View
} from 'react-native';

export default class Droppable extends Component {
  constructor(props){
      super(props);

      this.state = {
          dropZoneValues  : null,
      };
  }
  isDropZone(gesture) {
      var dz = this.state.dropZoneValues;
      // TODO: only works heightwise (for now)
      let inHeight = (gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height);
      let inWidth = (gesture.moveX > dz.x && gesture.moveX < dz.x + dz.width);
      return inWidth && inHeight;
  }
  render() {
    return (
        <View
          onLayout={this.setDropZoneValues.bind(this)}
          style={styles.dropZone}
        >
          {this.props.children}
        </View>
    );
  }

  setDropZoneValues(event) {
    let dropZoneValues = event.nativeEvent.layout;
    this.setState({dropZoneValues});
  }
}

Droppable.propTypes = {children: React.PropTypes.element.isRequired }

let styles = StyleSheet.create({
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    }
});