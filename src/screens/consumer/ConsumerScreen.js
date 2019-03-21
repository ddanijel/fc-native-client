import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";

import {images} from "../../../assets/images";
import QrCodeScannerComponent from "../QrCodeScannerScreen";
import {Button as BaseButton, Text as NativeText} from "native-base";
import {openQrScanner} from "../../store/actions/uiActionCreators";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class ConsumerScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Scan QR Code'),
            headerLeft: <BaseButton hasText transparent onPress={() => navigation.navigate('Home')}>
                <NativeText>Home</NativeText>
            </BaseButton>
        };
    };

    componentDidMount() {
        this.props.onConsumerScreenOpen();
    }

    render() {
        return (

            <ImageBackground source={images.background} style={styles.bgImage}>
                <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
                    <QrCodeScannerComponent thisNavigationRef={this.props.navigation}/>
                </View>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onConsumerScreenOpen: () => dispatch(openQrScanner())
    }
};


export default connect(null, mapDispatchToProps)(ConsumerScreen);


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

