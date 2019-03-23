import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Icon} from "native-base";

class ProducerScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 5}}
                      onPress={() => {
                          navigation.getParam('signOut')();
                      }}>
                    <Icon style={{color: 'red'}} name="ios-log-out"/>
                    <Text style={{color: 'red', marginLeft: 5}}>Sign Out</Text>
                </TouchableOpacity>
            ),
            title: navigation.getParam('otherParam', 'Producer Mode'),
            headerRight: (
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 5}}
                      onPress={() => {
                          navigation.getParam('openSettingsScreen')();
                      }}>
                    <Text style={{color: 'blue', marginRight: 5}}>Settings</Text>
                    <Icon style={{color: 'blue'}} name="ios-settings"/>
                </TouchableOpacity>
            )
        }
    };

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({
            openSettingsScreen: this.openSettingsScreen,
            signOut: this.signOut
        })
    }


    openSettingsScreen = () => {
        this.props.navigation.navigate('ProducerSettings');
    };

    signOut = async () => {
        // await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };


    render() {
        return (
            <View style={styles.container}>
                {/*<Button title="Show me more of the app" onPress={this.openSettingsScreen}/>*/}
                {/*<Button title="Actually, sign me out :)" onPress={this.signOut}/>*/}

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
    settingsIcon: {
        marginRight: 10
    }
});

export default ProducerScreen;