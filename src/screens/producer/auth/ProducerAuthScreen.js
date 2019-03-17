import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    LayoutAnimation,
    ScrollView,
    StyleSheet,
    Text,
    UIManager,
    View
} from 'react-native';
import {connect} from "react-redux";
import {Font} from 'expo';
import {Button, Card, Input, ListItem} from 'react-native-elements';
import {Button as BaseButton, Text as NativeText} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {images} from '../../../../assets/images';
import {fetchSignUpFormData, tryAuth} from "../../../store/actions/producerActionCreators";
import {LOG_IN, SIGN_UP} from "../../../store/actions/actionTypes";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({selected}) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected}/>
        </View>
    );
};

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

class ProducerAuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logIn: {
                username: 'u1',
                password: 'p1',
                isPasswordValid: true
            },
            signUp: {
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
            fontLoaded: false,
            selectedCategory: 0,
            isEmailValid: true,
        };

        this.selectCategory = this.selectCategory.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Producer Mode'),
            headerLeft: <BaseButton hasText transparent onPress={() => navigation.navigate('Home')}>
                <NativeText>Home</NativeText>
            </BaseButton>
        };
    };

    async componentDidMount() {
        await Font.loadAsync({
            georgia: require('../../../../assets/fonts/Georgia.ttf'),
            regular: require('../../../../assets/fonts/Montserrat-Regular.ttf'),
            light: require('../../../../assets/fonts/Montserrat-Light.ttf'),
            Roboto_medium: require("../../../../assets/fonts/Roboto_medium.ttf")
        });

        this.setState({fontLoaded: true});
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            // isLoading: false,
        });
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    login = () => {
        // const {email, password} = this.state;
        // this.setState({isLoading: true});
        // // Simulate an API call
        // setTimeout(() => {
        //     LayoutAnimation.easeInEaseOut();
        //     this.setState({
        //         isLoading: false,
        //         isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        //         isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        //     });
        // }, 1500);
        // console.log("Login....");
        const {username, password} = this.state.logIn;
        const authData = {
            username,
            password
        };
        this.props.onAuth(authData, LOG_IN, this);
        this.cleanUpState();
    };

    signUp() {
        // const {email, password, passwordConfirmation} = this.state;
        // this.setState({isLoading: true});
        // // Simulate an API call
        // setTimeout(() => {
        //     LayoutAnimation.easeInEaseOut();
        //     this.setState({
        //         isLoading: false,
        //         isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        //         isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        //         isConfirmationValid:
        //             password == passwordConfirmation || this.confirmationInput.shake(),
        //     });
        //     console.log("Login....");
        //     this.props.navigation.navigate('ConsumerStack')
        // }, 1500);
        const {
            producerName,
            licenceNumber,
            ethereumAccount,
            website,
            password,
            username,
            certificates,
            actions
        } = this.state.signUp;

        const authData = {
            producerName: producerName,
            licenceNumber: licenceNumber,
            ethereumAccount: ethereumAccount,
            url: website,
            password: password,
            username: username,
            producerCertificates: certificates,
            producerActions: actions
        };
        this.props.onAuth(authData, SIGN_UP, this);
        this.cleanUpState();
    }

    cleanUpState = () => {

    };

    render() {
        const {
            selectedCategory
        } = this.state;

        const {isLoading} = this.props;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;
        return (
            <View style={styles.container}>
                <ImageBackground source={images.background} style={styles.bgImage}>
                    {this.state.fontLoaded ? (

                        <KeyboardAvoidingView
                            behavior="position"
                        >
                            <ScrollView
                                contentContainerStyle={styles.loginContainer}>

                                <View style={styles.titleContainer}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.titleText}>FOOD</Text>
                                    </View>
                                    <View style={{marginTop: -10, marginLeft: 10}}>
                                        <Text style={styles.titleText}>CHAIN</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Button
                                        disabled={isLoading}
                                        clear
                                        activeOpacity={0.7}
                                        onPress={() => this.selectCategory(0)}
                                        containerStyle={{flex: 1}}
                                        titleStyle={[
                                            styles.categoryText,
                                            isLoginPage && styles.selectedCategoryText,
                                        ]}
                                        title={'Login'}
                                    />
                                    <Button
                                        disabled={isLoading}
                                        clear
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            this.selectCategory(1);
                                            this.props.onSignUpFormOpened();
                                        }}
                                        containerStyle={{flex: 1}}
                                        titleStyle={[
                                            styles.categoryText,
                                            isSignUpPage && styles.selectedCategoryText,
                                        ]}
                                        title={'Sign up'}
                                    />
                                </View>
                                <View style={styles.rowSelector}>
                                    <TabSelector selected={isLoginPage}/>
                                    <TabSelector selected={isSignUpPage}/>
                                </View>
                                <View style={styles.formContainer}>

                                    {isLoginPage && (
                                        <View style={{width: '100%'}}>
                                            <Input
                                                leftIcon={
                                                    <Icon
                                                        name="user"
                                                        color="rgba(0, 0, 0, 0.38)"
                                                        size={25}
                                                        style={{backgroundColor: 'transparent'}}
                                                    />
                                                }
                                                value={this.state.logIn.username}
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
                                                    const logIn = {
                                                        ...this.state.logIn,
                                                        username
                                                    };
                                                    this.setState({logIn})
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
                                                value={this.state.logIn.password}
                                                keyboardAppearance="light"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                secureTextEntry={true}
                                                returnKeyType={isSignUpPage ? 'next' : 'done'}
                                                blurOnSubmit={true}
                                                containerStyle={{
                                                    marginTop: 16,
                                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                                }}
                                                inputStyle={{marginLeft: 10}}
                                                placeholder={'Password'}
                                                ref={input => (this.passwordInput = input)}
                                                onSubmitEditing={() =>
                                                    isSignUpPage
                                                        ? this.confirmationInput.focus()
                                                        : this.login()
                                                }
                                                onChangeText={password => {
                                                    const logIn = {
                                                        ...this.state.logIn,
                                                        password
                                                    };
                                                    this.setState({logIn})
                                                }}
                                                errorMessage={
                                                    this.state.logIn.isPasswordValid
                                                        ? null
                                                        : 'Please enter at least 8 characters'
                                                }
                                            />
                                        </View>
                                    )}

                                    {isSignUpPage && (
                                        <View style={{width: '100%'}}>
                                            <Input
                                                leftIcon={
                                                    <Icon
                                                        name="user-o"
                                                        color="rgba(0, 0, 0, 0.38)"
                                                        size={25}
                                                        style={{backgroundColor: 'transparent'}}
                                                    />
                                                }
                                                value={this.state.signUp.producerName}
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
                                                        ...this.state.signUp,
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
                                                value={this.state.signUp.licenceNumber}
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
                                                        ...this.state.signUp,
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
                                                value={this.state.signUp.username}
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
                                                        ...this.state.signUp,
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
                                                value={this.state.signUp.password}
                                                keyboardAppearance="light"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                secureTextEntry={true}
                                                returnKeyType={isSignUpPage ? 'next' : 'done'}
                                                blurOnSubmit={true}
                                                containerStyle={{
                                                    marginBottom: 16,
                                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                                }}
                                                inputStyle={{marginLeft: 10}}
                                                placeholder={'Password'}
                                                ref={input => (this.passwordInput = input)}
                                                onSubmitEditing={() =>
                                                    isSignUpPage
                                                        ? this.confirmationInput.focus()
                                                        : this.login()
                                                }
                                                onChangeText={password => {
                                                    const signUp = {
                                                        ...this.state.signUp,
                                                        password
                                                    };
                                                    this.setState({signUp})
                                                }}
                                                errorMessage={
                                                    this.state.signUp.isPasswordValid
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
                                                value={this.state.signUp.passwordConfirmation}
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
                                                        ...this.state.signUp,
                                                        passwordConfirmation
                                                    };
                                                    this.setState({signUp})
                                                }}
                                                errorMessage={
                                                    this.state.signUp.isConfirmationValid
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
                                                value={this.state.signUp.ethereumAccount}
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
                                                        ...this.state.signUp,
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
                                                value={this.state.signUp.website}
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
                                                        ...this.state.signUp,
                                                        website
                                                    };
                                                    this.setState({signUp})
                                                }}
                                                // errorMessage={
                                                //     isEmailValid ? null : 'Please enter a username'
                                                // }
                                            />

                                            <Card title="Certificates">
                                                <View style={{width: '100%'}}>
                                                    <ScrollView style={{
                                                        height: SCREEN_HEIGHT * 0.3,
                                                        width: '100%'
                                                    }}>
                                                        {this.props.signUpFormInitData.certificates.map(certificate => (
                                                            <ListItem title={certificate.certificateName}
                                                                      key={Math.random()} switch={{
                                                                value: this.state.signUp.certificates.some(cert => cert.certificateName === certificate.certificateName),
                                                                onValueChange: value => {
                                                                    const signUp = value ? {
                                                                        ...this.state.signUp,
                                                                        certificates: [...this.state.signUp.certificates, certificate],
                                                                    } : {
                                                                        ...this.state.signUp,
                                                                        certificates: [...this.state.signUp.certificates.filter(cert => cert.certificateName !== certificate.certificateName)]
                                                                    };
                                                                    this.setState({signUp})
                                                                },
                                                            }} bottomDivider/>
                                                        ))}
                                                    </ScrollView>

                                                    <Input
                                                        style={{width: '100%'}}
                                                        containerStyle={[styles.inputContainerStyle]}
                                                        placeholder="Enter new Certificate"
                                                        value={this.state.signUp.newCertificate}
                                                        onChangeText={newCertificate => {
                                                            const signUp = {
                                                                ...this.state.signUp,
                                                                newCertificate
                                                            };
                                                            this.setState({signUp})
                                                        }}
                                                        ref={ref1 => (this.shakeInput1 = ref1)}
                                                        rightIcon={
                                                            <Button
                                                                title="Add"
                                                                onPress={() => {
                                                                    this.props.signUpFormInitData.certificates.push({
                                                                        certificateName: this.state.signUp.newCertificate
                                                                    });
                                                                    const signUp = {
                                                                        ...this.state.signUp,
                                                                        certificates: [...this.state.signUp.certificates, {
                                                                            certificateName: this.state.signUp.newCertificate
                                                                        }],
                                                                        newCertificate: ''
                                                                    };
                                                                    this.setState({signUp});
                                                                    this.shakeInput1 && this.shakeInput1.shake()
                                                                }}
                                                            />
                                                        }
                                                        errorMessage="Shake me on error !"
                                                    />
                                                </View>
                                            </Card>

                                            <Card title="Actions">
                                                <View style={{width: '100%'}}>
                                                    <ScrollView style={{
                                                        height: SCREEN_HEIGHT * 0.3,
                                                        width: '100%'
                                                    }}>
                                                        {this.props.signUpFormInitData.actions.map(action => (
                                                            <ListItem title={action.actionName}
                                                                      key={Math.random()} switch={{
                                                                value: this.state.signUp.actions.some(act => act.actionName === action.actionName),
                                                                onValueChange: value => {
                                                                    const signUp = value ? {
                                                                        ...this.state.signUp,
                                                                        actions: [...this.state.signUp.actions, action],
                                                                    } : {
                                                                        ...this.state.signUp,
                                                                        actions: [...this.state.signUp.actions.filter(act => act.actionName !== action.actionName)]
                                                                    };
                                                                    this.setState({signUp})
                                                                },
                                                            }} bottomDivider/>
                                                        ))}
                                                    </ScrollView>

                                                    <Input
                                                        style={{width: '100%'}}
                                                        containerStyle={[styles.inputContainerStyle]}
                                                        placeholder="Enter new Action"
                                                        value={this.state.signUp.newAction}
                                                        onChangeText={newAction => {
                                                            const signUp = {
                                                                ...this.state.signUp,
                                                                newAction
                                                            };
                                                            this.setState({signUp})
                                                        }}
                                                        ref={ref => (this.shakeInput2 = ref)}
                                                        rightIcon={
                                                            <Button
                                                                title="Add"
                                                                onPress={() => {
                                                                    this.props.signUpFormInitData.actions.push({
                                                                        actionName: this.state.signUp.newAction
                                                                    });
                                                                    const signUp = {
                                                                        ...this.state.signUp,
                                                                        actions: [...this.state.signUp.actions, {
                                                                            actionName: this.state.signUp.newAction
                                                                        }],
                                                                        newAction: ''
                                                                    };
                                                                    this.setState({signUp});
                                                                    this.shakeInput2 && this.shakeInput2.shake()
                                                                }}
                                                            />
                                                        }
                                                        errorMessage="Shake me on error !"
                                                    />
                                                </View>
                                            </Card>

                                        </View>
                                    )}

                                    <Button
                                        buttonStyle={styles.loginButton}
                                        containerStyle={{marginTop: 32, flex: 0}}
                                        activeOpacity={0.8}
                                        title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                                        onPress={isLoginPage ? this.login : this.signUp}
                                        titleStyle={styles.loginTextButton}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                </View>

                            </ScrollView>
                        </KeyboardAvoidingView>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        signUpFormInitData: state.producer.signUpFormInitData,
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUpFormOpened: () => dispatch(fetchSignUpFormData()),
        onAuth: (authData, authMode, thisRef) => dispatch(tryAuth(authData, authMode, thisRef))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerAuthScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawerIcon: {
        marginLeft: 15
    },
    inputContainerStyle: {
        marginTop: 16,
        width: '100%',
    }
});
