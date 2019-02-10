import React from 'react';
import { View, Text } from 'react-native';

class Consumer extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Consumer page</Text>
        <Text>Please scan a product tag hash</Text>
      </View>
    );
  }
}

export default Consumer;
