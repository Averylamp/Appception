import React,{
    Component,
    View,
    Dimensions
} from 'react-native';

let Window = Dimensions.get('window');


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
    console.log(gesture.moveX, dz.x, dz.width);
    console.log(inHeight, inWidth);
    return inWidth && inHeight;
  }
  render() {
    return (
        <View
          onLayout={() => setTimeout(this.recalculate.bind(this), 200)}
          ref="view"
          style={this.props.styles}
        >
        {this.props.children}
        </View>
    );
  }
  recalculate() {
    this.refs.view.measure(function(ox, oy, width, height, x, y) {
      this.setState({dropZoneValues: {x, y, width, height}})
    }.bind(this));
  }
}

Droppable.propTypes = {children: React.PropTypes.element.isRequired }