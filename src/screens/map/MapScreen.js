import React from 'react';
import {MapView} from 'expo';
import {Button as BaseButton, Text as NativeText} from "native-base";
import {connect} from "react-redux";
import {Dimensions, View} from "react-native";
import CustomMarker from '../../components/map/CustomMarker';
import ProductTagDetails from '../../components/productTag/ProductTagDetails';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class MapScreen extends React.Component {
    state = {
        isLoading: true,
        markers: [],
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Map Mode'),
            headerLeft: <BaseButton hasText transparent onPress={() => navigation.navigate('Home')}>
                <NativeText>Home</NativeText>
            </BaseButton>
        };
    };

    render() {
        return (
            <MapView
                style={{flex: 1}}
            >
                {this.props.isLoading ? null : this.props.ptChain.map((pt, index) => {
                    const coords = {
                        latitude: pt.latitude,
                        longitude: pt.longitude,
                    };
                    const metadata = `Status: ${pt.productTagId}`;

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={"Some title"}
                            description={metadata}
                        >
                            <CustomMarker title={index + 1}/>

                            <MapView.Callout>
                                <View style={{width: SCREEN_WIDTH * 0.7, height: SCREEN_HEIGHT * 0.6}}>
                                    <ProductTagDetails productTag={pt}/>
                                </View>
                            </MapView.Callout>

                        </MapView.Marker>
                    );
                })}
            </MapView>
        );
    }
}

const mapStateToProps = state => {
    return {
        ptChain: state.productTag.scannedPTChain,
        isLoading: state.ui.isLoading
    };
};

export default connect(mapStateToProps, null)(MapScreen);