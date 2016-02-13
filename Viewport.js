import React,{
    Component,
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native';

export default class Viewport extends Component {
  constructor(props){
      super(props);

      this.state = {
          showDraggable   : true,
          dropZoneValues  : null,
          pan             : new Animated.ValueXY(),
          parentContainerXY: null
      };

      this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder : () => true,
          onPanResponderMove           : Animated.event([null,{
              dx : this.state.pan.x,
              dy : this.state.pan.y
          }]),
          onPanResponderRelease        : (e, gesture) => {
              if(this.isDropZone(gesture)){
                  this.setState({
                      showDraggable : false
                  });
              }else{
                  Animated.spring(
                      this.state.pan,
                      {toValue:{x:0,y:0}}
                  ).start();
              }
          }
      });
  }
  parentLaidOut(e) {
    this.setState({
      parentContainerXY: e.nativeEvent.layout
    });
  }
  isDropZone(gesture){
      var dz = this.state.dropZoneValues;
      // TODO: only works heightwize
      return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }
  render() {
    return (
      <View style={styles.mainContainer} onLayout={this.parentLaidOut.bind(this)}>
        <View
          onLayout={this.setDropZoneValues.bind(this)}     //Step 2
          style={styles.dropZone}
        >
          <Text style={styles.text}>Drop me here!</Text>
        </View>

        {this.renderDraggable()}
  
      </View>
    );
  }

  setDropZoneValues(event){
    console.log(this.state);
    let dropZoneValues = event.nativeEvent.layout;
    dropZoneValues.x += this.state.parentContainerXY.x;
    dropZoneValues.y += this.state.parentContainerXY.y;
    this.setState({dropZoneValues});
  }

  renderDraggable(){
    if (!this.state.showDraggable) return;

    return (
        <View style={styles.draggableContainer}>
            <Animated.View 
                {...this.panResponder.panHandlers}                       
                style={[this.state.pan.getLayout(), styles.circle]}>
                <Text style={styles.text}>Drag me!</Text>
            </Animated.View>
        </View>
      );
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});