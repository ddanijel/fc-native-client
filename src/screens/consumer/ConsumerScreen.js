import React from 'react';
import {Dimensions, ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";

import {images} from "../../../assets/images";
import {Button as BaseButton, Text as NativeText} from "native-base";
import {openQrScannerModal} from "../../store/actions/uiActionCreators";
import QrScannerModal from "../qrScanner/QrScannerModal";
import Common from "../../constants/Common";
import MapViewModal from "../map/MapViewModal";


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
        this.props.onQrScannerModalOpen();
    }

    render() {
        return (

            <ImageBackground source={images.background} style={styles.bgImage}>
                {this.props.isQrScannerModalOpen ?
                    <QrScannerModal mode={Common.mode.CONSUMER}
                                    thisNavigationRef={this.props.navigation}
                    /> : null}
                {this.props.isMapViewModalOpen ?
                    <MapViewModal mode={Common.mode.CONSUMER}
                                  thisNavigationRef={this.props.navigation}
                    /> : null}
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return {
        isQrScannerModalOpen: state.ui.isQrScannerModalOpen,
        isMapViewModalOpen: state.ui.isMapViewModalOpen
    };
};


const mapDispatchToProps = dispatch => {
    return {
        // onConsumerScreenOpen: () => dispatch(openQrScanner()),
        onQrScannerModalOpen: () => dispatch(openQrScannerModal())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConsumerScreen);


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

