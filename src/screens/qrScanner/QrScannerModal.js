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

        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps valid: ', nextProps.scannedProductTagValid);
        console.log('componentWillReceiveProps exists: ', nextProps.producerScannedProductTagAlreadyScanned);
        if (this.props.numOfScannedProductTags < nextProps.numOfScannedProductTags) {
            console.log('this.props.numOfScannedProductTags: ', this.props.numOfScannedProductTags);
            console.log('nextProps.numOfScannedProductTags: ', nextProps.numOfScannedProductTags);
            this.showAlertOnPTScan(nextProps);
        }
    }

    showAlertOnPTScan = nextProps => {
        this.setState({...this.state, alertOpen: true});
        const {
            alertTitle,
            alertMessage,
            alertButtons
        } = (this.props.mode === Common.mode.PRODUCER) ?
            this.getProducerAlertData(nextProps) : this.getConsumerAlertData(nextProps);

            Alert.alert(
                alertTitle,
                alertMessage,
                alertButtons,
                {cancelable: false},
            )


    };

    getProducerAlertData = (nextProps) => {
        console.log('valid: ', nextProps.scannedProductTagValid);
        console.log('exists: ', nextProps.producerScannedProductTagAlreadyScanned);
        const title = (!nextProps.scannedProductTagValid || nextProps.producerScannedProductTagAlreadyScanned) ?
            'Error' : 'Success';
        let message = 'Product successfully scanned.';
        if (!nextProps.scannedProductTagValid) {
            message = 'Scanned product tag is not valid.'
        } else if (nextProps.producerScannedProductTagAlreadyScanned) {
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


    getConsumerAlertData = (nextProps) => {
        console.log('valid: ', nextProps.scannedProductTagValid);
        console.log('exists: ', nextProps.consumerScannedProductTagAlreadyScanned);
        const title = (!nextProps.scannedProductTagValid || nextProps.consumerScannedProductTagAlreadyScanned) ?
            'Error' : 'Success';
        let message = 'Product successfully scanned.';
        if (!nextProps.scannedProductTagValid) {
            message = 'Scanned product tag is not valid.'
        } else if (nextProps.consumerScannedProductTagAlreadyScanned) {
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

    onAlertClosed = () => {
        this.setState({
            ...this.state,
            alertOpen: false
        })
    };

    onModalClosed = () => {
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
        producerScannedProductTagAlreadyScanned: state.producer.scannedProductTagAlreadyScanned,
        consumerScannedProductTagAlreadyScanned: state.consumer.scannedProductTagAlreadyScanned,
        scannedProductTagValid: state.productTag.scannedProductTagValid,
        numOfScannedProductTags: state.productTag.numOfScannedProductTags
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