import React,{
    Component,
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
          ref="view"
          onLayout={this.setDropZoneValues.bind(this)}
          style={this.props.styles}
        >
        {this.props.children}
        </View>
    );
  }
  recalculate() {
    this.refs.view.measure((ox, oy, width, height, x, y) =>
      this.setState({dropZoneValues: {x, y, width, height}})
    );
  }
  setDropZoneValues(event) {
    let dropZoneValues = event.nativeEvent.layout;
    console.log('dropZoneValues');
    this.setState({dropZoneValues});
  }
}

Droppable.propTypes = {children: React.PropTypes.element.isRequired }