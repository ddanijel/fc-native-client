import React from 'react';
import {ActivityIndicator, AsyncStorage, Button, StatusBar, StyleSheet, View,} from 'react-native';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import ProducerAuthScreen from '../screens/producer/auth/ProducerAuthScreen';
import ProducerScreen from '../screens/producer/ProducerScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ConsumerScreen from "../screens/consumer/ConsumerScreen";


class OtherScreen extends React.Component {
    static navigationOptions = {
        title: 'Lots of features here',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="I'm done, sign me out" onPress={this._signOutAsync}/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = createStackNavigator({Home: ProducerScreen, Other: OtherScreen});
const AuthStack = createStackNavigator({SignIn: ProducerAuthScreen});
const WelcomeStack = createStackNavigator({Welcome: WelcomeScreen});
const ConsumerStack = createStackNavigator({Home: ConsumerScreen})

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
        Welcome: WelcomeStack,
        Consumer: ConsumerStack
    },
    {
        initialRouteName: 'Welcome',
    }
));

