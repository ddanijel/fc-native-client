import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {images} from '../assets/images';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class WelcomeScreen extends React.Component {

    render() {
        return (
            <ImageBackground source={images.background} style={styles.bgImage}>
                <View
                    style={{
                        paddingTop: '20%',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        // justifyContent: 'center',
                    }}>
                    <View>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 36,
                                fontWeight: 'bold',
                                marginBottom: 20,
                            }}>
                            Food Chain Tracking System
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 36, fontWeight: 'bold', marginBottom: 20}}>
                            Select your role
                        </Text>
                    </View>
                    <View style={{width: '80%'}}>
                        <Button
                            buttonStyle={styles.loginButton}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title={"Producer"}
                            onPress={() => this.props.navigation.navigate('Auth')}
                            titleStyle={styles.loginTextButton}
                        />
                        <Button
                            buttonStyle={styles.loginButton}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title={"Producer"}
                            onPress={() => this.props.navigation.navigate('Consumer', {
                                itemId: 86,
                                otherParam: 'anything you want here',
                            })}
                            titleStyle={styles.loginTextButton}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
});

export default WelcomeScreen;