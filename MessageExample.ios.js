'use strict';
import Button from './Button.js';
import React, {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

console.log(require("NativeModules"));
var Composer = require('NativeModules').RNMessageComposer;
console.log("yay");
console.log(Composer);

 
Composer.messagingSupported(supported => {
	// do something like change the view based on whether or not messaging is supported 	
	// for example you could use this in componentWill/DidMount and show/hide components based on result 
	// you could also use this to set state within app which would make showing/hiding components easier 
	// render() {
	//     return (
	//       <View style={{flex:1}}><Button>send</Button>
	//       </View>
	//     );
 //    }
 console.log("hellp");
});

var MessageExample = React.createClass({
    getInitialState() {
      return {};
    },

	_onPressButton: function(args){
		this._sendMessage({
				    'messageText':'My sample message body text',
				    'subject':'My Sample Subject',
				    'recipients':['0987654321', '0123456789']
	        	});
	},

	// inside your code where you would like to send a message 
	_sendMessage: function (args) {
		Composer.composeMessageWithArgs(
			args,
			(result) => {
				switch(result) {
					case Composer.Sent:
						console.log('the message has been sent');
						break;
					case Composer.Cancelled:
						console.log('user cancelled sending the message');
						break;
					case Composer.Failed:
						console.log('failed to send the message');
						break;
					case Composer.NotSupported:
						console.log('this device does not support sending texts');
						break;
					default:
						console.log('something unexpected happened');
						break;
				}
			}
		);
	},
  render() {
    return (
      <View style={{flex:1}}>
      	<View style={styles.buttonContainer}>
	      <Button
	      	highlightProps={{onPress: this._onPressButton, style: styles.buttonStyle, underlayColor: '#20967C'}}
	      	containProps={{style: styles.textContainer}}
	      	textProps={{style: styles.text, text: 'Message a friend!'}}
	  	  />
	  	</View>
      </View>
    );
  }

});

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
  	borderRadius: 15,
    backgroundColor: '#6cd5be', 
    borderColor: '#20967C',
  },
  text: {
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#20967C',
    overflow: 'hidden', // https://github.com/facebook/react-native/issues/904
    fontSize:35,
    color:'white'
  }

});


module.exports = MessageExample;
