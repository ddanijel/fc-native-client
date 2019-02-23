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
    View,
} from 'react-native';
import {Font} from 'expo';
import {Button, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {images} from '../../../assets/images';

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

export default class ProducerAuthScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Producer Mode'),
        };
    };
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            fontLoaded: false,
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
        };

        this.selectCategory = this.selectCategory.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            georgia: require('../../../assets/fonts/Georgia.ttf'),
            regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
            light: require('../../../assets/fonts/Montserrat-Light.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    login() {
        const {email, password} = this.state;
        this.setState({isLoading: true});
        // Simulate an API call
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
            });
        }, 1500);
        console.log("Login....");
        this.props.navigation.navigate('ConsumerStack')
    }

    signUp() {
        const {email, password, passwordConfirmation} = this.state;
        this.setState({isLoading: true});
        // Simulate an API call
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
                isConfirmationValid:
                    password == passwordConfirmation || this.confirmationInput.shake(),
            });
            console.log("Login....");
            this.props.navigation.navigate('ConsumerStack')
        }, 1500);
    }

    render() {
        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            email,
            password,
            passwordConfirmation,
        } = this.state;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={images.background} style={styles.bgImage}>
                    {this.state.fontLoaded ? (
                        <View>
                            <KeyboardAvoidingView
                                contentContainerStyle={styles.loginContainer}
                                behavior="position"
                            >
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
                                        onPress={() => this.selectCategory(1)}
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
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name="envelope-o"
                                                color="rgba(0, 0, 0, 0.38)"
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={email}
                                        keyboardAppearance="light"
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Email'}
                                        containerStyle={{
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                        }}
                                        ref={input => (this.emailInput = input)}
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                        onChangeText={email => this.setState({email})}
                                        errorMessage={
                                            isEmailValid ? null : 'Please enter a valid email address'
                                        }
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
                                        value={password}
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
                                        onChangeText={password => this.setState({password})}
                                        errorMessage={
                                            isPasswordValid
                                                ? null
                                                : 'Please enter at least 8 characters'
                                        }
                                    />
                                    {isSignUpPage && (
                                        <Input
                                            icon={
                                                <SimpleIcon
                                                    name="lock"
                                                    color="rgba(0, 0, 0, 0.38)"
                                                    size={25}
                                                    style={{backgroundColor: 'transparent'}}
                                                />
                                            }
                                            value={passwordConfirmation}
                                            secureTextEntry={true}
                                            keyboardAppearance="light"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            keyboardType="default"
                                            returnKeyType={'done'}
                                            blurOnSubmit={true}
                                            containerStyle={{
                                                marginTop: 16,
                                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                            }}
                                            inputStyle={{marginLeft: 10}}
                                            placeholder={'Confirm password'}
                                            ref={input => (this.confirmationInput = input)}
                                            onSubmitEditing={this.signUp}
                                            onChangeText={passwordConfirmation =>
                                                this.setState({passwordConfirmation})
                                            }
                                            errorMessage={
                                                isConfirmationValid
                                                    ? null
                                                    : 'Please enter the same password'
                                            }
                                        />
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
                            </KeyboardAvoidingView>
                            <View style={styles.helpContainer}>
                                <Button
                                    title="Welcome screen"
                                    titleStyle={{color: 'white'}}
                                    buttonStyle={{backgroundColor: 'transparent'}}
                                    underlayColor="transparent"
                                    onPress={() => this.props.navigation.navigate('Welcome')}
                                />
                            </View>
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </ImageBackground>
            </ScrollView>
        );
    }
}

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
});
