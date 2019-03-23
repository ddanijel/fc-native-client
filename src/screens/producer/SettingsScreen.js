import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {Button} from "react-native-elements";
import {Text, View} from "react-native";
import {Icon} from "native-base";

export default class SettingsScreen extends React.Component {
    // static navigationOptions = ({navigation}) => {
    //     return {
    //         // headerLeft: (
    //         //     <View style={{flex: 1, flexDirection: 'row'}}>
    //         //         <Icon name="ios-arrow-back" onPress={() => navigation.navigate('Producer')}/>
    //         //         <Text>Back</Text>
    //         //     </View>
    //         // ),
    //         title: 'Producer Settings',
    //         // left: 'Back',
    //         // right: <Button title='Back' onPress={() => navigation.navigate('Producer')} />
    //     }
    // };

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return <ExpoConfigView/>;
    }
}
