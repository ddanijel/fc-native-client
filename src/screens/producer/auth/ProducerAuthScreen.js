import React from 'react';
import {AsyncStorage, Button, StyleSheet, View} from 'react-native';

class ProducerAuthScreen extends React.Component {
    static navigationOptions = {
        title: 'Producer Auth screen',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in!" onPress={this._signInAsync}/>
                <Button
                    title="Welcome screen"
                    onPress={() => this.props.navigation.navigate('Welcome')}
                />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProducerAuthScreen;