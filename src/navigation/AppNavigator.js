import React from 'react';
import {AsyncStorage, Button, StatusBar, StyleSheet, View} from 'react-native';

import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import ProducerAuthScreen from '../screens/producer/auth/ProducerAuthScreen';
import ProducerScreen from '../screens/producer/ProducerScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ConsumerScreen from "../screens/consumer/ConsumerScreen";
import MapScreen from "../screens/map/MapScreen";
import SettingsScreen from "../screens/producer/SettingsScreen";




// class AuthLoadingScreen extends React.Component {
//     constructor() {
//         super();
//         this._bootstrapAsync();
//     }
//
//     // Fetch the token from storage then navigate to our appropriate place
//     _bootstrapAsync = async () => {
//         const userToken = await AsyncStorage.getItem('userToken');
//
//         // This will switch to the App screen or Auth screen and this loading
//         // screen will be unmounted and thrown away.
//         this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//     };
//
//     // Render any loading content that you like here
//     render() {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator/>
//                 <StatusBar barStyle="default"/>
//             </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const ProducerStack = createStackNavigator({Home: ProducerScreen, ProducerSettings: SettingsScreen});
const ProducerAuthStack = createStackNavigator({SignIn: ProducerAuthScreen});
const HomeStack = createStackNavigator({Home: HomeScreen});
const ConsumerStack = createStackNavigator({Consumer: ConsumerScreen});
const MapStack = createStackNavigator({Map: MapScreen});


//
// const HomeDrawerNavigator = createDrawerNavigator({
//         Home: HomeStack,
//     },
//     {contentComponent: HomeScreenDrawer},
//     {
//         headerMode: 'none',
//         navigationOptions: {
//             headerVisible: false
//         }
//     });
//
// const HomeHomeStack = createStackNavigator({Home: HomeDrawerNavigator});

export default createAppContainer(createSwitchNavigator(
    {
        // AuthLoading: AuthLoadingScreen,
        Producer: ProducerStack,
        Auth: ProducerAuthStack,
        Consumer: ConsumerStack,
        Home: HomeStack,
        Map: MapStack
    },
    {
        initialRouteName: 'Home',
    }
));

