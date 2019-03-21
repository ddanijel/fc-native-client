import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import {connect} from "react-redux";
import {fetchPTByHash, prepareStateForQrCodeScannerScreen} from "../store/actions/productTagActionCreators";
import PTMapDetails from "../components/map/PTMapDetails";

class QrCodeScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
    };

    componentWillMount() {
        this.props.onQrCodeScannerScreenOpen();
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data }) => {
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.props.onQRScanned(data);
    };



    render() {
        const { hasCameraPermission } = this.state;

        const barCodeScanner = (this.props.isLoading || !this.props.isQrCodeScannerOpen) ? <ActivityIndicator/> :
            <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
            />;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                {barCodeScanner}
                <PTMapDetails/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isQrCodeScannerOpen: state.ui.isQrCodeScannerOpen,
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onQrCodeScannerScreenOpen: () => dispatch(prepareStateForQrCodeScannerScreen()),
        onQRScanned: hash => dispatch(fetchPTByHash(hash))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScannerScreen);