import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Alert
} from "react-native";
import {
    Location,
    Permissions
} from 'expo';
import {Icon} from "native-base";
import {connect} from "react-redux";
import {
    Button,
    Card,
    ListItem
} from "react-native-elements";
import Layout from "../../constants/Layout";
import Common from "../../constants/Common";
import {
    fetchProducerData,
    fetchSignUpFormData, generateNewProductTag
} from "../../store/actions/producerActionCreators";
import {setPTForMapView} from "../../store/actions/mapActionCreators";
import QrScannerModal from "../qrScanner/QrScannerModal";
import {
    closeQrScannerModal, openMapViewModal,
    openQrScannerModal
} from "../../store/actions/uiActionCreators";
import MapViewModal from "../map/MapViewModal";
import ProducerActionList from "../../components/ProducerActionList";

import ptUpdateUtil from '../../util/ptUpdateUtil';

class ProducerScreen extends Component {
    state = {
        componentInitMount: true,
        locationErrorMessage: '',
        newActionValue: '',
        newProductTag: {
            longitude: null,
            latitude: null,
            previousProductTagHashes: [],
            productTagActions: [],
            productTagProducer: {
                producerId: null
            }
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

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.producerData && this.state.componentInitMount) {
            this.setState({
                ...this.state,
                componentInitMount: false,
                newProductTag: {
                    ...this.state.newProductTag,
                    productTagActions: nextProps.producerData.producerActions,
                    productTagProducer: {
                        producerId: nextProps.producerData.producerId
                    }
                }
            })
        }
        if (this.props.numberOfGeneratedProductTags < nextProps.numberOfGeneratedProductTags) {
            if (nextProps.productTagSuccessfullyGenerated) {
                this.showAlertOnSuccessGeneratedProductTag(nextProps);
            } else {
                this.showAlertOnErrorGeneratedProductTag(nextProps);
            }
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
        const newProductTag = value ? {
            ...this.state.newProductTag,
            productTagActions: [...this.state.newProductTag.productTagActions, action]
        } : {
            ...this.state.newProductTag,
            productTagActions: [...this.state.newProductTag.productTagActions.filter(act => act.actionName !== action.actionName)]
        };
        this.setState({newProductTag});
    };

    handleNewActionChangeText = newActionValue => {
        this.setState({newActionValue})
    };

    handleAddNewAction = () => {
        const newAction = {
            actionName: this.state.newActionValue
        };
        this.props.allActions.push(newAction);
        const newProductTag = {
            ...this.state.newProductTag,
            productTagActions: [...this.state.newProductTag.productTagActions, newAction],
        };
        this.setState({newProductTag, newActionValue: ''});
    };

    _getLocationAsync = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({
                    locationErrorMessage: 'Permission to access location was denied!'
                });
            }

            const location = await Location.getCurrentPositionAsync({});
            this.setState({
                ...this.state,
                newProductTag: {
                    ...this.state.newProductTag,
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                }
            });
        }

    };

    showNoPTAlert = () => {
        Alert.alert(
            'Warning',
            'You have not scanned any product tag, are you sure it is the first product tag in the chain?',
            [
                {
                    text: 'Yes, create Product Tag', onPress: () => {
                        const productTag = {
                            ...this.state.newProductTag,
                            previousProductTagHashes: [Common.GENESIS_PRODUCT_TAG_HASH_VALUE]
                        };
                        this.props.generateNewProductTag(this.props.jwtToken, productTag);
                    }
                },
                {text: 'Scan Product', onPress: () => this.props.onQrScannerModalOpen()},
                {text: 'Close', onPress: () => console.log('Close Pressed')},
            ],
            {cancelable: false}
        )
    };

    showNoActionsAlert = () => {
        Alert.alert(
            'Warning',
            'You have not selected any action for this product tag!',
            [
                {text: 'Close', onPress: () => console.log('Close Pressed')},
            ],
            {cancelable: false}
        )
    };

    onGenerateNewProductTagPressed = async () => {
        await this._getLocationAsync();
        if (this.props.scannedProductTags.length === 0) {
            this.showNoPTAlert();
        } else if (this.state.newProductTag.productTagActions.length === 0) {
            this.showNoActionsAlert();
        } else {
            const previousProductTagHashes = this.props.scannedProductTags.map(productTag => productTag.hash);
            await this.setState({newProductTag: {...this.state.newProductTag, previousProductTagHashes}});
            this.props.generateNewProductTag(this.props.jwtToken, this.state.newProductTag);
        }
    };

    showAlertOnErrorGeneratedProductTag = nextProps => {
        Alert.alert(
            'Error',
            'An error occurred while generating the product tag!',
            [
                {text: 'Try again', onPress: () => this.onGenerateNewProductTagPressed()},
                {text: 'Close', onPress: () => console.log('Close Pressed')},
            ],
            {cancelable: false}
        )
    };

    showAlertOnSuccessGeneratedProductTag = nextProps => {
        console.log('generated pt nextProps: ', nextProps);
        Alert.alert(
            'Success',
            'Product Tag successfully generated!',
            [
                {text: 'Pring QR Code', onPress: () => console.log('pring qr code pressed')},
                {
                    text: 'Show Details', onPress: () => {
                        this.props.setPTForMapView(ptUpdateUtil(nextProps.generatedProductTag));
                        this.props.onMapViewModalOpen();
                    }
                },
                {text: 'Close', onPress: () => console.log('Close Pressed')},
            ],
            {cancelable: false}
        )
    };

    render() {
        const {width, height} = Layout.window;
        return (
            <KeyboardAvoidingView
                behavior="position"
                style={{
                    // alignItems: 'center',
                    // margin: -20
                }}
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

                    <Button activeOpacity={0.7} style={{
                        ...styles.buttonStyle,
                        width: width * 0.8,
                        marginTop: 15,
                        alignSelf: 'center'
                    }} title="Scan Product" onPress={() => this.props.onQrScannerModalOpen()}/>

                    <Card title="Product Tag Actions" style={{
                        width: '100%'
                    }}>
                        <ProducerActionList
                            heightPercent={0.3}
                            actions={this.props.allActions}
                            selectedActions={this.state.newProductTag.productTagActions}
                            onActionToggleChange={(value, action) => this.handleActionToggleChange(value, action)}
                            newActionValue={this.state.newActionValue}
                            onNewActionChangeText={newAction => this.handleNewActionChangeText(newAction)}
                            onAddNewAction={() => this.handleAddNewAction()}
                        />
                    </Card>

                    {this.props.isQrScannerModalOpen ? <QrScannerModal mode={Common.mode.PRODUCER}/> : null}
                    {this.props.isMapViewModalOpen ? <MapViewModal mode={Common.mode.PRODUCER}/> : null}

                    <Button activeOpacity={0.7} style={{
                        ...styles.buttonStyle,
                        width: width * 0.8,
                        marginTop: 15,
                        marginBottom: 15,
                        alignSelf: 'center'
                    }} title="Generate Product Tag" onPress={() => this.onGenerateNewProductTagPressed()}/>
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
        numberOfGeneratedProductTags: state.producer.numberOfGeneratedProductTags,
        productTagSuccessfullyGenerated: state.producer.productTagSuccessfullyGenerated,
        generatedProductTag: state.producer.generatedProductTag
        // newProductTagActions: state.producer.newProductTag.productTagActions
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
        generateNewProductTag: (jwtToken, productTagData) => dispatch(generateNewProductTag(jwtToken, productTagData))
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
    },
    buttonStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
});