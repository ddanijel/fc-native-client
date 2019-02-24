import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {images} from "../../../assets/images";
import QrCodeScannerComponent from "../QrCodeScannerScreen";
import {Button as BaseButton, Text as NativeText} from "native-base";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class ConsumerScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Consumer Mode'),
            headerLeft: <BaseButton hasText transparent onPress={() => navigation.navigate('Home')}>
                <NativeText>Home</NativeText>
            </BaseButton>
        };
    };

    render() {
        return (

            <ImageBackground source={images.background} style={styles.bgImage}>
                {/*<View style={{*/}
                    {/*flex: 1,*/}
                    {/*alignItems: 'center',*/}
                    {/*justifyContent: 'center',*/}
                    {/*width: SCREEN_WIDTH * 0.8,*/}
                    {/*height: SCREEN_HEIGHT * 0.6*/}
                {/*}}>*/}
                    <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
                        <QrCodeScannerComponent/>
                    </View>
                {/*</View>*/}
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