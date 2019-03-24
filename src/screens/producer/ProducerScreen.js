import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "native-base";
import {connect} from "react-redux";
import {Button, Card, ListItem} from "react-native-elements";
import Layout from "../../constants/Layout";
import {closeAlertOnScan, fetchProducerData, setPTForMapView} from "../../store/actions/producerActionCreators";
import QrScannerModal from "./QrScannerModal";
import {
    closeProducerMapViewModal,
    closeProducerQrScannerModal, openProducerMapViewModal,
    openProducerQrScannerModal
} from "../../store/actions/uiActionCreators";
import MapViewModal from "./MapViewModal";

class ProducerScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 5}}
                                  onPress={() => {
                                      navigation.getParam('signOut')();
                                  }}>
                    <Icon style={{color: 'red'}} name="ios-log-out"/>
                    <Text style={{color: 'red', marginLeft: 5}}>Sign Out</Text>
                </TouchableOpacity>
            ),
            title: navigation.getParam('otherParam', 'Producer Mode'),
            headerRight: (
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 5}}
                                  onPress={() => {
                                      navigation.getParam('openSettingsScreen')();
                                  }}>
                    <Text style={{color: 'blue', marginRight: 5}}>Settings</Text>
                    <Icon style={{color: 'blue'}} name="ios-settings"/>
                </TouchableOpacity>
            )
        }
    };

    componentDidMount() {
        const {navigation, onProducerScreenMounted} = this.props;
        onProducerScreenMounted(this.props.jwtToken, this.props.activeProducerId);
        navigation.setParams({
            openSettingsScreen: this.openSettingsScreen,
            signOut: this.signOut
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.isAlertOnScanOpen === false && nextProps.isAlertOnScanOpen === true) {
            this.showAlertOnPTScan();
        }
    }


    openSettingsScreen = () => {
        this.props.navigation.navigate('ProducerSettings');
    };

    signOut = async () => {
        // await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    showAlertOnPTScan = () => {
        const alertTitle = this.props.scannedProductTagValid ?
            'Success' : 'Error';
        const alertMessage = this.props.scannedProductTagValid ?
            'Product tag successfully found for the scanned QR code!' :
            'There is no product tag for the scanned QR code!';
        Alert.alert(
            alertTitle,
            alertMessage,
            [
                {
                    text: 'Scan again',
                    onPress: () => {
                        this.props.closeAlertOnScan();
                    },
                    style: 'default',
                },
                {
                    text: 'Close', onPress: () => {
                        this.props.closeAlertOnScan();
                        this.props.onQrScannerModalClose();
                    }
                },
            ],
            {cancelable: false},
        );
    };

    onScannedProductButtonGroupPressed = (index, pt) => {
        switch (index) {
            case 0: {
                this.showPTDetails(pt);
            }
            case 1: {
                this.removeSelectedPT(pt);
            }
        }
    };

    showPTDetails = pt => {
        this.props.setPTForMapView(pt);
        this.props.onMapViewModalOpen();
    };

    removeSelectedPT = pt => {

    };

    render() {
        const {width, height} = Layout.window;
        return (
            <ScrollView>
                {/*<Button title="Show me more of the app" onPress={this.openSettingsScreen}/>*/}
                {/*<Button title="Actually, sign me out :)" onPress={this.signOut}/>*/}


                <Card style={{width: width}} title="Scanned Products">
                    <View>
                        <ScrollView style={{
                            height: height * 0.3,
                            // width: '100%'
                        }}>
                            {this.props.scannedProductTags.map(pt => {
                                const hash = pt.hash;
                                return <ListItem key={hash}
                                                 title={pt.ptDetails.dateTime}
                                                 buttonGroup={{
                                                     buttons: ['Details', 'Remove'],
                                                     onPress: (index) => this.onScannedProductButtonGroupPressed(index, pt)
                                                 }}
                                />
                            })}
                        </ScrollView>
                    </View>
                </Card>

                <Button title="Scan Product" onPress={() => this.props.onQrScannerModalOpen()}/>
                {this.props.isProducerQrScannerModalOpen ? <QrScannerModal/> : null}
                {this.props.isProducerMapViewModalOpen ? <MapViewModal/> : null}

                <Card style={{width: width}} title="PT Actions">
                    <View style={{width: width}}>
                        <ScrollView style={{
                            height: height * 0.3,
                            width: '100%'
                        }}>
                            {this.props.producerData ?
                                this.props.producerData.producerActions.map(action => (
                                    <ListItem title={action.actionName}
                                              key={Math.random()} bottomDivider/>
                                )) : null}
                        </ScrollView>

                        {/*<Input*/}
                        {/*style={{width: '100%'}}*/}
                        {/*containerStyle={[styles.inputContainerStyle]}*/}
                        {/*placeholder="Enter new Action"*/}
                        {/*value={this.state.signUp.newAction}*/}
                        {/*onChangeText={newAction => {*/}
                        {/*const signUp = {*/}
                        {/*...this.state.signUp,*/}
                        {/*newAction*/}
                        {/*};*/}
                        {/*this.setState({signUp})*/}
                        {/*}}*/}
                        {/*ref={ref => (this.shakeInput2 = ref)}*/}
                        {/*rightIcon={*/}
                        {/*<Button*/}
                        {/*title="Add"*/}
                        {/*onPress={() => {*/}
                        {/*this.props.signUpFormInitData.actions.push({*/}
                        {/*actionName: this.state.signUp.newAction*/}
                        {/*});*/}
                        {/*const signUp = {*/}
                        {/*...this.state.signUp,*/}
                        {/*actions: [...this.state.signUp.actions, {*/}
                        {/*actionName: this.state.signUp.newAction*/}
                        {/*}],*/}
                        {/*newAction: ''*/}
                        {/*};*/}
                        {/*this.setState({signUp});*/}
                        {/*this.shakeInput2 && this.shakeInput2.shake()*/}
                        {/*}}*/}
                        {/*/>*/}
                        {/*}*/}
                        {/*// errorMessage="Shake me on error !"*/}
                        {/*/>*/}
                    </View>
                </Card>

                <Button title="Generate Product Tag" onPress={() => console.log('generate pt')}/>
            </ScrollView>
        );
    }

}

const mapStateToProps = state => {
    return {
        producerData: state.producer.activeProducer,
        activeProducerId: state.producer.activeProducerId,
        jwtToken: state.producer.jwtToken,
        scannedProductTags: state.producer.scannedProductTags,
        scannedProductTagValid: state.producer.scannedProductTagValid,
        isAlertOnScanOpen: state.producer.isAlertOnScanOpen,
        isProducerQrScannerModalOpen: state.ui.isProducerQrScannerModalOpen,
        isProducerMapViewModalOpen: state.ui.isProducerMapViewModalOpen
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onProducerScreenMounted: (token, producerId) => dispatch(fetchProducerData(token, producerId)),
        onQrScannerModalOpen: () => dispatch(openProducerQrScannerModal()),
        closeAlertOnScan: () => dispatch(closeAlertOnScan()),
        onQrScannerModalClose: () => dispatch(closeProducerQrScannerModal()),
        onMapViewModalClose: () => dispatch(closeProducerMapViewModal()),
        onMapViewModalOpen: () => dispatch(openProducerMapViewModal()),
        setPTForMapView: (ptChain) => dispatch(setPTForMapView(ptChain))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsIcon: {
        marginRight: 10
    }
});