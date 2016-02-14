import React,{
    Component,
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native';
const CLICK_THRESHOLD = 10;


export default class Draggable extends Component {
  constructor(props) {
      super(props);

      this.state = {
          pan             : new Animated.ValueXY(),
      };

      this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder : () => true,
          onPanResponderMove           : Animated.event([null,{
              dx : this.state.pan.x,
              dy : this.state.pan.y
          }]),
          onPanResponderRelease        : (e, gesture) => {
          	  if (Math.abs(gesture.dx) < CLICK_THRESHOLD && Math.abs(gesture.dy) < CLICK_THRESHOLD) {
          	  	return this.props.onClick();
          	  }

			  let cmp = this.props.findDropZone(gesture);
            if (cmp) {
            	this.props.onDropped(cmp);
              Animated.spring(
                  this.state.pan,
                  {toValue:{x:0, y:0}}
              ).start();
            } else {
                Animated.spring(
                    this.state.pan,
                    {toValue:{x:0, y:0}}
                ).start();
            }
          }
      });
  }

  render() {
    if (!this.props.showDraggable) return;
    return (
        <View style={styles.draggableContainer}>
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout(), styles.circle]}>
                {this.props.children}
            </Animated.View>
        </View>
    );
  }

};
Draggable.PropTypes = {
	findDropZone: React.PropTypes.func,
	onDropped: React.PropTypes.func,
	onClick: React.PropTypes.func,
	showDraggable: React.PropTypes.bool,
  children: React.PropTypes.element.isRequired
};

Draggable.defaultProps = {
	showDraggable: true,
	dropped: () => true,
	findDropZone: () => false,
	onClick: () => true
};

let CIRCLE_RADIUS = 50;
let Window = Dimensions.get('window');

let styles = StyleSheet.create({
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height - CIRCLE_RADIUS * 2,
        left        : Window.width - CIRCLE_RADIUS * 2,
    },
    circle      : {
	    backgroundColor     : 'transparent',
    }
});
