import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert} from 'react-native';
import { Constants, BarCodeScanner, Permissions} from 'expo';
import {connect} from "react-redux";
import * as actionCreators from "../store/actions/consumerActionsCreators";

class QrCodeScannerScreen extends Component {
    state = {
        hasCameraPermission: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        Alert.alert(
            'Scan successful!',
            data.data
        );
        this.props.onScanProductTagHash(data.data);
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{ height: '100%', width: '100%'}}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }
});


const mapStateToProps = state => {
    return {
        languages: state.languages.languages,
        currentLanguageIndex: state.languages.translations.languageIndex,
        languageTitle: state.languages.translations.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onScanProductTagHash: (productTagHash) => dispatch(
            actionCreators.getProductTagData(productTagHash))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScannerScreen);