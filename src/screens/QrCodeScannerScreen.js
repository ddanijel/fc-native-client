// import React, { Component } from 'react';
// import { Text, View, StyleSheet, Alert} from 'react-native';
// import { Constants, BarCodeScanner, Permissions} from 'expo';
// import {connect} from "react-redux";
// import * as actionCreators from "../store/actions/consumerActionsCreators";
//
// class QrCodeScannerScreen extends Component {
//     state = {
//         hasCameraPermission: null
//     };
//
//     componentDidMount() {
//         this._requestCameraPermission();
//     }
//
//     _requestCameraPermission = async () => {
//         const { status } = await Permissions.askAsync(Permissions.CAMERA);
//         this.setState({
//             hasCameraPermission: status === 'granted',
//         });
//     };
//
//     _handleBarCodeRead = data => {
//         Alert.alert(
//             'Scan successful!',
//             data.data
//         );
//         this.props.onScanProductTagHash(data.data);
//     };
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 {this.state.hasCameraPermission === null ?
//                     <Text>Requesting for camera permission</Text> :
//                     this.state.hasCameraPermission === false ?
//                         <Text>Camera permission is not granted</Text> :
//                         <BarCodeScanner
//                             barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
//                             onBarCodeRead={this._handleBarCodeRead}
//                             style={{ height: '100%', width: '100%'}}
//                         />
//                 }
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: Constants.statusBarHeight,
//         backgroundColor: '#ecf0f1',
//     }
// });
//
//
// const mapStateToProps = state => {
//     return {
//         languages: state.languages.languages,
//         currentLanguageIndex: state.languages.translations.languageIndex,
//         languageTitle: state.languages.translations.language
//     };
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onScanProductTagHash: (productTagHash) => dispatch(
//             actionCreators.getProductTagData(productTagHash))
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScannerScreen);

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import {connect} from "react-redux";
import {fetchPTByHash} from "../store/actions/productTagActionCreators";

class QrCodeScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data }) => {
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.props.onQRScanned(data, this.props.thisRef);
    };

    render() {
        const { hasCameraPermission } = this.state;

        const barCodeScanner = this.props.isLoading ? <ActivityIndicator/> :
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
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onQRScanned: (hash, thisRef) => dispatch(fetchPTByHash(hash, thisRef))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScannerScreen);