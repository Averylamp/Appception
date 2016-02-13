'use strict';

import React, {View, Text} from 'react-native';

function AppceptionAdapter(Component) {
  return React.createClass({
    setNativeProps(nativeProps) {
      this._root.setNativeProps(nativeProps);
    },

    render() {
      return (
        <View ref={component => this._root = component}>
          <Component {...this.props} />
        </View>
      );
    }
  });
}

export default AppceptionAdapter;
