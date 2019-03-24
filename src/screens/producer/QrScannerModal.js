import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import Layout from "../../constants/Layout";
import {closeProducerQrScannerModal} from "../../store/actions/uiActionCreators";
import {fetchPTByHash, openAlertOnScan} from "../../store/actions/producerActionCreators";

import {BarCodeScanner} from "expo";



class QrScannerModal extends Component {

    handleBarCodeScanned = ({ type, data }) => {
        if (!this.props.isAlertOnScanOpen) {
            // this.props.onModalClose();
            this.props.fetchPTByHash(data);
            this.props.openAlertOnScan();
        }
    };


    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.isProducerQrScannerModalOpen}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <View style={{
                                height: Layout.window.height * 0.9,
                                width: Layout.window.width
                            }}>
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
                                </BarCodeScanner>
                            </View>

                            <TouchableHighlight
                                onPress={() => {
                                    this.props.onModalClose()
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: () => dispatch(closeProducerQrScannerModal()),
        fetchPTByHash: (hash) => dispatch(fetchPTByHash(hash)),
        openAlertOnScan: () => dispatch(openAlertOnScan())
    }
};

const mapStateToProps = state => {
    return {
        isProducerQrScannerModalOpen: state.ui.isProducerQrScannerModalOpen,
        isAlertOnScanOpen: state.producer.isAlertOnScanOpen,
        scannedProductTagValid: state.producer.scannedProductTagValid
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
});