import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {Button} from "react-native-elements";

export default class SettingsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Producer Settings',
            left: 'Back',
            right: <Button title='About' onPress={() => navigation.navigate('Producer')} />
        }
    };

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return <ExpoConfigView/>;
    }
}
