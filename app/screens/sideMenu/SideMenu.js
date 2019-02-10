import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { DrawerActions } from 'react-navigation';
import * as theme from '../../utils/Theme';

class SideMenu extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Side Menu</Text>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <View>
            <Text>Select language</Text>
            <Button
              title="EN"
              onPress={() => {
                alert('EN');
              }}
            />
            <Button
              title="DE"
              onPress={() => {
                alert('DE');
              }}
            />
            <Button
              title="IT"
              onPress={() => {
                alert('IT');
              }}
            />
            <Button
              title="FR"
              onPress={() => {
                alert('FR');
              }}
            />
          </View>
          <Text style={styles.button}>Close</Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 24,
    // fontFamily: 'Baskerville',
  },
  button: {
    margin: 16,
    color: theme.colors.orange,
    fontSize: 16,
  },
};

export default SideMenu;
