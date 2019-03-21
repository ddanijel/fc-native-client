import React, {Component} from 'react';
import {AsyncStorage, Button, StyleSheet, View} from "react-native";

class ProducerScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Home'),
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Show me more of the app" onPress={this._showMoreApp}/>
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync}/>

            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('ProducerSettings');
    };

    _signOutAsync = async () => {
        // await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProducerScreen;