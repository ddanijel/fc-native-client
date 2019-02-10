import React, { Component } from 'react';
import { Button, StatusBar, Text, View } from 'react-native';

export default class Home extends Component {
  producerHandler = () => {
    alert('I am a producer');
  };

  consumerHandler = () => {
    alert('I am a consumer');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Text style={styles.titleText}>Food Chain {'\n'} Tracking System</Text>
        <Text style={styles.text}>Please select your role</Text>
        <Button title="Producer" style={styles.producerButton} onPress={this.producerHandler} />
        <Button title="Consumer" style={styles.consumerButton} onPress={this.consumerHandler} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
  },
  text: {
    fontSize: 24,
    // fontFamily: 'Baskerville',
  },
  consumerButton: {
    width: '30%',
  },
  producerButton: {
    width: '30%',
  },
};
