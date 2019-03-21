import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import {connect} from "react-redux";
import {
    fetchPTByHash,
    onScanAgainPressed,
    prepareStateForQrCodeScannerScreen
} from "../store/actions/productTagActionCreators";
import PTMapDetails from "../components/map/PTMapDetails";

class QrCodeScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
    };

    componentWillMount() {

    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        this.props.onQrCodeScannerScreenOpen();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.ptNotFound === false && nextProps.ptNotFound === true) {
            this.showAlertPTNotFound();
        }
    }

    handleBarCodeScanned = ({ type, data }) => {
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.props.onQRScanned(data);
    };

    showAlertPTNotFound = () => {
        Alert.alert(
            'Product Tag Not Found',
            'There is no product tag for the scanned QR code!',
            [
                {
                    text: 'Scan again',
                    onPress: () => this.props.onScanAgainPressed(),
                    style: 'default',
                },
                {text: 'Home', onPress: () => this.props.thisNavigationRef.navigate('Home')},
            ],
            {cancelable: false},
        );
    };



    render() {
        const { hasCameraPermission } = this.state;

        const barCodeScanner = (this.props.isLoading || !this.props.isQrCodeScannerOpen) ? <ActivityIndicator/> :
            <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned}
                style={[StyleSheet.absoluteFill, styles.container]}
            >
                <View style={styles.layerTop} />
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />
            </BarCodeScanner>;

        const foundPtMapView = !this.props.ptNotFound && !this.props.isLoading ?
            <PTMapDetails/> : null;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                {barCodeScanner}
                {foundPtMapView}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isQrCodeScannerOpen: state.ui.isQrCodeScannerOpen,
        isLoading: state.ui.isLoading,
        ptNotFound: state.productTag.ptNotFound
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onQrCodeScannerScreenOpen: () => dispatch(prepareStateForQrCodeScannerScreen()),
        onQRScanned: hash => dispatch(fetchPTByHash(hash)),
        onScanAgainPressed: () => dispatch(onScanAgainPressed())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScannerScreen);


const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    layerTop: {
        flex: 0.5,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 0.5,
        backgroundColor: opacity
    },
});