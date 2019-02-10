import React from 'react';
import { Button, View, Text } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Food Chain Tracking System</Text>
        <View>
          <Text>Select your role</Text>
        </View>
        <Button title="Producer" onPress={() => this.props.navigation.navigate('Producer')} />
        <Button title="Consumer" onPress={() => this.props.navigation.navigate('Consumer')} />
      </View>
    );
  }
}

export default HomeScreen;
