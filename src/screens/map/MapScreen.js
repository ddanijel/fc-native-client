import React from 'react';
import {MapView} from 'expo';
import {connect} from "react-redux";
import {Dimensions, View} from "react-native";
import CustomMarker from '../../components/map/CustomMarker';
import ProductTagDetails from '../../components/productTag/ProductTagDetails';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCANNED_HASH_MARKER_REF = 'SCANNED_HASH_MARKER_REF';

class MapScreen extends React.Component {
    state = {
        isLoading: true,
    };

    // static navigationOptions = ({navigation}) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'Map Mode'),
    //         headerLeft: <BaseButton hasText transparent onPress={() => navigation.navigate('Home')}>
    //             <NativeText>Home</NativeText>
    //         </BaseButton>
    //     };
    // };

    // please don't do this Danijel
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.ptNotFound === false && nextProps.ptNotFound === false) {
            if (!this.props.ptNotFound) {
                setTimeout(function () {
                    this.refs.SCANNED_HASH_MARKER_REF.showCallout();
                }.bind(this), 1000);
            }
        }
    }

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
                    const markerScannedPTHashRef = (this.props.scannedHash === pt.productTagHash) ?
                        SCANNED_HASH_MARKER_REF : null;

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={"Some title"}
                            description={metadata}
                            ref={markerScannedPTHashRef}
                            style={markerScannedPTHashRef ? {zIndex: 0} : {}}
                        >
                            <CustomMarker
                                title={index + 1}
                                diffColor={pt.productTagHash === this.props.scannedHash}
                                style={markerScannedPTHashRef ? {zIndex: 0} : {}}
                            />

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
        scannedHash: state.productTag.scannedHash,
        isLoading: state.ui.isLoading,
        ptNotFound: state.productTag.ptNotFound
    };
};

export default connect(mapStateToProps, null)(MapScreen);