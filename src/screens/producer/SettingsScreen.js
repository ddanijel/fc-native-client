import React from 'react';
import {Card, Input} from "react-native-elements";
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import ProducerCertificateList from "../../components/ProducerCertificateList";
import ProducerActionList from "../../components/ProducerActionList";
import {connect} from "react-redux";
import {openQrScannerModal} from "../../store/actions/uiActionCreators";
import {images} from "../../../assets/images";
import Layout from "../../constants/Layout";
import {fetchSignUpFormData} from "../../store/actions/producerActionCreators";
import removeDuplicates from '../../util/uniqueArrayElements';

class SettingsScreen extends React.Component {
    // static navigationOptions = ({navigation}) => {
    //     return {
    //         // headerLeft: (
    //         //     <View style={{flex: 1, flexDirection: 'row'}}>
    //         //         <Icon name="ios-arrow-back" onPress={() => navigation.navigate('Producer')}/>
    //         //         <Text>Back</Text>
    //         //     </View>
    //         // ),
    //         title: 'Producer Settings',
    //         // left: 'Back',
    //         // right: <Button title='Back' onPress={() => navigation.navigate('Producer')} />
    //     }
    // };

    state = {
        producerToUpdate: {
            username: '',
            password: '',
            passwordConfirmation: '',
            isPasswordValid: true,
            isConfirmationValid: true,
            producerName: '',
            ethereumAccount: '',
            isEthereumAccountValid: true,
            licenceNumber: '',
            website: '',
            certificates: [],
            actions: [],
            newCertificate: '',
            newAction: ''
        },
    };

    componentDidMount() {
        const {activeProducer, signUpFormInitData, fetchSignUpFormInitData} = this.props;
        // console.log('active producer: ', activeProducer);
        // console.log('initial sign up form init data: ', signUpFormInitData);

        let certificates = activeProducer.producerCertificates;
        let actions = activeProducer.producerActions;

        if (signUpFormInitData.actions.length === 0 || signUpFormInitData.certificates.length === 0) {
            fetchSignUpFormInitData();
        } else {
            // console.log('inside else: ', signUpFormInitData);
            certificates = [...certificates, ...signUpFormInitData.certificates];
            actions = [...actions, ...signUpFormInitData.actions];

            certificates = [...removeDuplicates(certificates, 'certificateName')];
            actions = [...removeDuplicates(actions, 'actionName')];
            console.log('after concat: ', certificates);
        }

        this.setState({
            ...this.state,
            producerToUpdate: {
                isPasswordValid: true,
                isConfirmationValid: true,
                producerName: activeProducer.producerName,
                ethereumAccount: activeProducer.ethereumAccount,
                isEthereumAccountValid: true,
                licenceNumber: activeProducer.licenceNumber,
                website: activeProducer.url,
                certificates,
                actions,
                newCertificate: '',
                newAction: ''
            }
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("nextProps: ", nextProps);
        const {actions, certificates} = this.props.signUpFormInitData;
        if ((actions.length === 0 || certificates.length) &&
            (nextProps.signUpFormInitData.actions.length !== 0 ||
                nextProps.signUpFormInitData.certificates.length !== 0)) {
            this.setState({
                ...this.state,
                producerToUpdate: {
                    ...this.state.producerToUpdate,
                    certificates: [...this.state.producerToUpdate.certificates, nextProps.signUpFormInitData.certificates],
                    actions: [...this.state.producerToUpdate.actions, nextProps.signUpFormInitData.actions]
                }
            })
        }
    }


    render() {
        return (
            <ImageBackground source={images.background}
                             style={{...styles.bgImage}}
            >
                <KeyboardAvoidingView
                    behavior="position"
                    style={{
                        width: Layout.window.width * 0.9
                    }}
                    contentContainerStyle={{
                        marginBottom: -50
                    }}
                >
                    <ScrollView
                        style={{
                            marginTop: 15,
                            marginBottom: 15,
                            backgroundColor: 'white',
                        }}
                    >
                        <Input
                            leftIcon={
                                <Icon
                                    name="user-o"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            }
                            value={this.state.producerToUpdate.producerName}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Producer Name'}
                            containerStyle={{
                                marginBottom: 16,
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            ref={input => (this.userInput = input)}
                            onSubmitEditing={() => this.userInput.focus()}
                            onChangeText={producerName => {
                                const signUp = {
                                    ...this.state.producerToUpdate,
                                    producerName
                                };
                                this.setState({signUp})
                            }}
                            // errorMessage={
                            //     isEmailValid ? null : 'Please enter a username'
                            // }
                        />

                        <Input
                            leftIcon={
                                <Icon
                                    name="drivers-license-o"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            }
                            value={this.state.producerToUpdate.licenceNumber}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Licence Number'}
                            containerStyle={{
                                marginBottom: 16,
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            ref={input => (this.userInput = input)}
                            onSubmitEditing={() => this.userInput.focus()}
                            onChangeText={licenceNumber => {
                                const signUp = {
                                    ...this.state.producerToUpdate,
                                    licenceNumber
                                };
                                this.setState({signUp})
                            }}
                            // errorMessage={
                            //     isEmailValid ? null : 'Please enter a username'
                            // }
                        />

                        <Input
                            leftIcon={
                                <Icon
                                    name="user"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            }
                            value={this.state.producerToUpdate.username}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Username'}
                            containerStyle={{
                                marginBottom: 16,
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            ref={input => (this.userInput = input)}
                            onSubmitEditing={() => this.userInput.focus()}
                            onChangeText={username => {
                                const signUp = {
                                    ...this.state.producerToUpdate,
                                    username
                                };
                                this.setState({signUp})
                            }}
                            // errorMessage={
                            //     isEmailValid ? null : 'Please enter a username'
                            // }
                        />

                        <Input
                            leftIcon={
                                <SimpleIcon
                                    name="lock"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            }
                            value={this.state.producerToUpdate.password}
                            keyboardAppearance="light"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            // returnKeyType={isSignUpPage ? 'next' : 'done'}
                            blurOnSubmit={true}
                            containerStyle={{
                                marginBottom: 16,
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Password'}
                            ref={input => (this.passwordInput = input)}
                            // onSubmitEditing={() =>
                            //     isSignUpPage
                            //         ? this.confirmationInput.focus()
                            //         : this.login()
                            // }
                            onChangeText={password => {
                                const signUp = {
                                    ...this.state.producerToUpdate,
                                    password
                                };
                                this.setState({signUp})
                            }}
                            errorMessage={
                                this.state.producerToUpdate.isPasswordValid
                                    ? null
                                    : 'Please enter at least 8 characters'
                            }
                        />

                        <Input
                            icon={
                                <SimpleIcon
                                    name="lock"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            }
                            value={this.state.producerToUpdate.passwordConfirmation}
                            secureTextEntry={true}
                            keyboardAppearance="light"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            containerStyle={{
                                marginBottom: 16,
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Confirm password'}
                            ref={input => (this.confirmationInput = input)}
                            onSubmitEditing={this.signUp}
                            onChangeText={passwordConfirmation => {
                                const signUp = {
                                    ...this.state.producerToUpdate,
                                    passwordConfirmation
                                };
                                this.setState({signUp})
                            }}
                            errorMessage={
                                this.state.producerToUpdate.isConfirmationValid
                                    ? null
                                    : 'Please enter the same password'
                            }
                        />


                        <Input
                            leftIcon={
                                <Icon
                                    name="connectdevelop"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            }
                            value={this.state.producerToUpdate.ethereumAccount}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Ethereum Account'}
                            containerStyle={{
                                marginBottom: 16,
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            ref={input => (this.userInput = input)}
                            onSubmitEditing={() => this.userInput.focus()}
                            onChangeText={ethereumAccount => {
                                const signUp = {
                                    ...this.state.producerToUpdate,
                                    ethereumAccount
                                };
                                this.setState({signUp})
                            }}
                            // errorMessage={
                            //     isEmailValid ? null : 'Please enter a username'
                            // }
                        />

                        <Input
                            leftIcon={
                                <Icon
                                    name="chrome"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            }
                            value={this.state.producerToUpdate.website}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Your Website URL'}
                            containerStyle={{
                                marginBottom: 16,
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            ref={input => (this.userInput = input)}
                            onSubmitEditing={() => this.userInput.focus()}
                            onChangeText={website => {
                                const signUp = {
                                    ...this.state.producerToUpdate,
                                    website
                                };
                                this.setState({signUp})
                            }}
                            // errorMessage={
                            //     isEmailValid ? null : 'Please enter a username'
                            // }
                        />

                        <Card title="Certificates" style={{
                            width: '100%'
                        }}>
                            <ProducerCertificateList
                                heightPercent={0.3}
                                certificates={this.state.producerToUpdate.certificates}
                                selectedCertificates={this.props.activeProducer.producerCertificates}
                                onCertificateToggleChange={(value, certificate) => this.handleCertificateToggleChange(value, certificate)}
                                newCertificateValue={this.state.producerToUpdate.newCertificate}
                                onNewCertificateChangeText={newCertificate => this.handleNewCertificateChangeText(newCertificate)}
                                onAddNewCertificate={() => this.handleAddNewCertificate()}
                            />

                        </Card>

                        <Card title="Default Actions" style={{
                            width: '100%'
                        }}>
                            <ProducerActionList
                                heightPercent={0.3}
                                actions={this.state.producerToUpdate.actions}
                                selectedActions={this.props.activeProducer.producerActions}
                                onActionToggleChange={(value, action) => this.handleActionToggleChange(value, action)}
                                showNewActionInput={true}
                                newActionValue={this.state.producerToUpdate.newAction}
                                onNewActionChangeText={newAction => this.handleNewActionChangeText(newAction)}
                                onAddNewAction={() => this.handleAddNewAction()}
                            />
                        </Card>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeProducer: state.producer.activeProducer,
        signUpFormInitData: state.producer.signUpFormInitData
    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchSignUpFormInitData: () => dispatch(fetchSignUpFormData()),
        onQrScannerModalOpen: () => dispatch(openQrScannerModal())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: Layout.window.width,
        height: Layout.window.height,
        justifyContent: 'center',
        alignItems: 'center',
    }
});