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

      this.initialPosition = this.props.initialPosition;
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
            this.props.onDropped(cmp);


            if (this.props.sticky) {
                Animated.spring(
                    this.state.pan,
                    {toValue:{x:0, y:0}}
                ).start();
            } else {
              this.state.pan.setOffset({x: this.currentPanValue.x, y: this.currentPanValue.y});
              this.state.pan.setValue({x: 0, y: 0});              
            }
          }
      });
  }
  componentDidMount() {
    this.currentPanValue = {x: 0, y: 0};
    this.panListener = this.state.pan.addListener((value) => this.currentPanValue = value);
  }
  componentWillUnmount() {
    this.state.pan.removeListener(this.panListener);
  }
  setInitialPosition(event) {
    if (!this.initialPosition) {
      this.initialPosition = {
        top: event.nativeEvent.layout.y,
        left: event.nativeEvent.layout.x,
        position: 'absolute'
      }
    }
  }
  render() {
    if (!this.props.showDraggable) return;
    staticStyles.draggableContainer = this.initialPosition;
    let styles = StyleSheet.create(staticStyles);
    return (
        <View onLayout={this.setInitialPosition} style={styles.draggableContainer}>
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout(), styles.circle]}
                onMoveShouldSetResponderCapture={evt => true}>
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
  children: React.PropTypes.element.isRequired,
  initialPosition: React.PropTypes.object,
  sticky: React.PropTypes.bool
};

Draggable.defaultProps = {
	showDraggable: true,
	dropped: () => true,
	findDropZone: () => false,
	onClick: () => true,
  sticky: false,
  initialPosition: {}
};

let staticStyles = {
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },  
    circle      : {
      backgroundColor     : 'transparent',
    }
}
