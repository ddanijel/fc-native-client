import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {images} from '../../../assets/images';
import {connect} from 'react-redux';
import {Icon} from "native-base";
import Drawer from 'react-native-drawer'
import HomeScreenDrawer from './HomescreenDrawer';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Home'),
            headerLeft: <Icon style={styles.drawerIcon} name="menu" onPress={() => {
                navigation.getParam('openSideDrawer')();
            }}/>
        };
    };

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({
            openSideDrawer: this.openSideDrawer,
        })
    }

    closeSideDrawer = () => {
        this._drawer.close()
    };

    openSideDrawer = () => {
        this._drawer.open()
    };

    render() {
        const drawerStyles = {
            drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
            main: {paddingLeft: 3},
        };
        return (
            <Drawer
                type="overlay"
                ref={(ref) => this._drawer = ref}
                content={<HomeScreenDrawer/>}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: {opacity: (2 - ratio) / 2}
                })}
            >
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
                        <View style={{width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                            <Button
                                title={this.props.producerTitle}
                                loading={false}
                                loadingProps={{size: 'small', color: 'white'}}
                                buttonStyle={{
                                    backgroundColor: 'rgba(111, 202, 186, 1)',
                                    borderRadius: 5,
                                }}
                                titleStyle={{fontWeight: 'bold', fontSize: 23}}
                                containerStyle={{marginVertical: 10, height: 50, width: 230}}
                                onPress={() => this.props.navigation.navigate('Auth')}
                                underlayColor="transparent"
                            />
                            <Button
                                title={this.props.consumerTitle}
                                loading={false}
                                loadingProps={{size: 'small', color: 'white'}}
                                buttonStyle={{
                                    backgroundColor: 'rgba(111, 202, 186, 1)',
                                    borderRadius: 5,
                                }}
                                titleStyle={{fontWeight: 'bold', fontSize: 23}}
                                containerStyle={{marginVertical: 10, height: 50, width: 230}}
                                onPress={() => this.props.navigation.navigate('Consumer', {
                                    itemId: 86,
                                    otherParam: 'anything you want here',
                                })}
                                underlayColor="transparent"
                            />
                        </View>
                    </View>
                </ImageBackground>
            </Drawer>
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