import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Location, Permissions} from 'expo';
import {Icon} from "native-base";
import {connect} from "react-redux";
import {Button, Card, ListItem} from "react-native-elements";
import Layout from "../../constants/Layout";
import Common from "../../constants/Common";
import {fetchProducerData, fetchSignUpFormData} from "../../store/actions/producerActionCreators";
import {setPTForMapView} from "../../store/actions/mapActionCreators";
import QrScannerModal from "../qrScanner/QrScannerModal";
import {
    closeQrScannerModal, openMapViewModal,
    openQrScannerModal
} from "../../store/actions/uiActionCreators";
import MapViewModal from "../map/MapViewModal";
import ProducerActionList from "../../components/ProducerActionList";

class ProducerScreen extends Component {
    state = {
        newProductTag: {
            newActionValue: ''
        }
    };

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
        });
        if (this.props.allActions.length === 0) {
            this.props.onSignUpDataNotLoaded();
        }
    }

    openSettingsScreen = () => {
        this.props.navigation.navigate('ProducerSettings');
    };

    signOut = async () => {
        // await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
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

    showPTDetails = productTag => {
        this.props.setPTForMapView(productTag);
        this.props.onMapViewModalOpen();
    };

    removeSelectedPT = productTag => {

    };

    handleActionToggleChange = (value, action) => {
        console.log('handleActionToggleChange')
    };

    handleNewActionChangeText = newAction => {
        console.log('handleNewActionChangeText')
    };

    handleAddNewAction = () => {
        console.log('handleAddNewAction')
    };

    onGenerateNewProductTagPressed = () => {

    };

    render() {
        const {width, height} = Layout.window;
        return (
            <KeyboardAvoidingView
                behavior="position"
            >
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
                                                         onPress: (index) => this.onScannedProductButtonGroupPressed(index, pt, hash)
                                                     }}
                                    />
                                })}
                            </ScrollView>
                        </View>
                    </Card>

                    <Button title="Scan Product" onPress={() => this.props.onQrScannerModalOpen()}/>

                    <Card title="Product Tag Actions" style={{
                        width: '100%'
                    }}>
                        <ProducerActionList
                            heightPercent={0.3}
                            actions={this.props.allActions}
                            selectedActions={this.props.newProductTagActions}
                            onActionToggleChange={(value, action) => this.handleActionToggleChange(value, action)}
                            newActionValue={this.state.newProductTag.newActionValue}
                            onNewActionChangeText={newAction => this.handleNewActionChangeText(newAction)}
                            onAddNewAction={() => this.handleAddNewAction()}
                        />
                    </Card>

                    {this.props.isQrScannerModalOpen ? <QrScannerModal mode={Common.mode.PRODUCER}/> : null}
                    {this.props.isMapViewModalOpen ? <MapViewModal mode={Common.mode.PRODUCER}/> : null}

                    <Button title="Generate Product Tag" onPress={() => this.onGenerateNewProductTagPressed()}/>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

}

const mapStateToProps = state => {
    return {
        producerData: state.producer.activeProducer,
        activeProducerId: state.producer.activeProducerId,
        jwtToken: state.producer.jwtToken,
        scannedProductTags: state.producer.scannedProductTags,
        // scannedProductTagValid: state.productTag.scannedProductTagValid,
        isAlertOnScanOpen: state.producer.isAlertOnScanOpen,
        isQrScannerModalOpen: state.ui.isQrScannerModalOpen,
        isMapViewModalOpen: state.ui.isMapViewModalOpen,
        allActions: state.producer.signUpFormInitData.actions,
        newProductTagActions: state.producer.newProductTag.productTagActions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUpDataNotLoaded: () => dispatch(fetchSignUpFormData()),
        onProducerScreenMounted: (token, producerId) => dispatch(fetchProducerData(token, producerId)),
        // closeAlertOnScan: () => dispatch(closeAlertOnScan()),
        onQrScannerModalOpen: () => dispatch(openQrScannerModal()),
        onQrScannerModalClose: () => dispatch(closeQrScannerModal()),
        onMapViewModalOpen: () => dispatch(openMapViewModal()),
        setPTForMapView: productTag => dispatch(setPTForMapView(productTag)),

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