import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {images} from "../../../assets/images";
import {Button} from "react-native-elements";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class ConsumerScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Consumer Mode'),
        };
    };

    render() {
        return (

            <ImageBackground source={images.background} style={styles.bgImage}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Consumer page</Text>
                    <Text>Please scan a product tag hash</Text>
                    <Button
                        title="Welcome screen"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ConsumerScreen;