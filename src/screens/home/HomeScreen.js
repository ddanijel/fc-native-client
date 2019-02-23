import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {images} from '../../assets/images';
import {connect} from 'react-redux';
import {Icon} from "native-base";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <Icon style={styles.drawerIcon} name="menu" onPress={() => navigation.openDrawer()}/>
        };
    };

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
                            title={this.props.producerTitle}
                            onPress={() => this.props.navigation.navigate('Auth')}
                            titleStyle={styles.loginTextButton}
                        />
                        <Button
                            buttonStyle={styles.loginButton}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title={this.props.consumerTitle}
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
    container: {
        flex: 1
    },
    drawerIcon: {
        marginLeft: 15
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

const mapStateToProps = state => {
    console.log(state.languages);
    return {
        producerTitle: state.languages.translations.producerTitle,
        consumerTitle: state.languages.translations.consumerTitle
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         on
//     };
// };

export default connect(mapStateToProps)(HomeScreen);