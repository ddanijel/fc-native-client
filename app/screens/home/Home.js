import React, { Component } from 'react';
import { Button, StatusBar, Text, View } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Text style={styles.titleText}>Food Chain Tracking System</Text>
        <Text style={styles.text}>Please select your role</Text>
        <Button
          title="Producer"
          style={styles.producerButton}
          onPress={() => alert('Producer selected')}
        />
        <Button
          title="Consumer"
          style={styles.consumerButton}
          onPress={() => alert('Consumer selected')}
        />
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
