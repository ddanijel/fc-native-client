import React, {Component} from 'react';
import {Modal, Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import Layout from "../../constants/Layout";
import {closeQrScannerModal} from "../../store/actions/uiActionCreators";
// import {openAlertOnScan} from "../../store/actions/producerActionCreators";
import {fetchPTByHash} from "../../store/actions/productTagActionCreators";

import {BarCodeScanner, Permissions} from "expo";
import Common from "../../constants/Common";


class QrScannerModal extends Component {
    state = {
        hasCameraPermission: null,
        alertOpen: false
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    handleBarCodeScanned = ({type, data}) => {
        if (!this.state.alertOpen) {
            this.props.fetchPTByHash(data, this.props.mode);
            this.showAlertOnPTScan();
        }
    };

    showAlertOnPTScan = () => {
        this.setState({...this.state, alertOpen: true});
        const {
            alertTitle,
            alertMessage,
            alertButtons
        } = (this.props.mode === Common.mode.PRODUCER) ?
            this.getProducerAlertData() : this.getConsumerAlertData();

        setTimeout(function () {
            Alert.alert(
                alertTitle,
                alertMessage,
                alertButtons,
                {cancelable: false},
            )}, 500);


    };

    getProducerAlertData = () => {
        console.log('valid: ', this.props.scannedProductTagValid);
        console.log('exists: ', this.props.scannedProductTagAlreadyScanned);
        const title = (!this.props.scannedProductTagValid || this.props.scannedProductTagAlreadyScanned) ?
            'Error' : 'Success';
        let message = 'Product successfully scanned.';
        if (!this.props.scannedProductTagValid) {
            message = 'Scanned product tag is not valid.'
        } else if (this.props.scannedProductTagAlreadyScanned) {
            message = 'This product is already scanned.'
        }
        return {
            alertTitle: title,
            alertMessage: message,
            alertButtons: [
                {
                    text: 'Scan again',
                    onPress: () => {
                        this.onAlertClosed();
                    },
                    style: 'default',
                },
                {
                    text: 'Close', onPress: () => {
                        this.onAlertClosed();
                        this.props.onQrScannerModalClose();
                    }
                }
            ]
        };
    };


    getConsumerAlertData = () => {
        return {
            alertTitle: '',
            alertMessage: '',
            alertButtons: [
                {
                    text: 'Scan again',
                    onPress: () => {
                        this.onAlertClosed();
                    },
                    style: 'default',
                },
                {
                    text: 'Close', onPress: () => {
                        this.onAlertClosed();
                        this.onModalClosed();
                    }
                }
            ]
        };
    };

    onAlertClosed = () => {
        this.setState({
            ...this.state,
            alertOpen: false
        })
    };

    onModalClosed = () => {
        if (this.props.mode === Common.mode.CONSUMER) {
            this.props.thisNavigationRef.navigate('Home');
        }
        this.props.onQrScannerModalClose();
    };

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.isQrScannerModalOpen}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <View style={{
                                height: Layout.window.height,
                                width: Layout.window.width
                            }}>
                                <BarCodeScanner
                                    onBarCodeScanned={this.handleBarCodeScanned}
                                    style={[StyleSheet.absoluteFill, styles.container]}
                                >
                                    <View style={styles.layerTop}/>
                                    <View style={styles.layerCenter}>
                                        <View style={styles.layerLeft}/>
                                        <View style={styles.focused}/>
                                        <View style={styles.layerRight}/>
                                    </View>
                                    <View style={styles.layerBottom}/>
                                </BarCodeScanner>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.mapButton}
                        onPress={() => this.onModalClosed()}
                    >
                        <Text style={{fontWeight: 'bold', color: 'black',}}>
                            Close Qr Scanner
                        </Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPTByHash: (hash, mode) => dispatch(fetchPTByHash(hash, mode)),
        onQrScannerModalClose: () => dispatch(closeQrScannerModal())
    }
};

const mapStateToProps = state => {
    return {
        isQrScannerModalOpen: state.ui.isQrScannerModalOpen,
        scannedProductTagAlreadyScanned: state.producer.scannedProductTagAlreadyScanned,
        scannedProductTagValid: state.productTag.scannedProductTagValid
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QrScannerModal);

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
    mapButton: {
        width: 150,
        height: 40,
        borderRadius: 85 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: 'black',
        shadowRadius: 8,
        shadowOpacity: 0.12,
        // opacity: .6,
        backgroundColor: 'silver',
        position: 'absolute',//use absolute position to show button on top of the map
        top: '90%', //for center align
        right: 10,
        alignSelf: 'flex-end' //for align to right
    }
});