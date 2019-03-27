import React, {Component} from 'react';
import {Alert, Dimensions, Modal, View, TouchableOpacity, Text, StyleSheet} from "react-native";
import {closeMapViewModal} from "../../store/actions/uiActionCreators";
import {connect} from "react-redux";
import {MapView} from "expo";
import CustomMarker from "../../components/map/CustomMarker";
import ProductTagDetails from "../../components/productTag/ProductTagDetails";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SCANNED_HASH_MARKER_REF = 'SCANNED_HASH_MARKER_REF';

class MapViewModal extends Component {

    // componentDidMount() {
    //     setTimeout(function () {
    //         this.refs.SCANNED_HASH_MARKER_REF.showCallout();
    //     }.bind(this), 2000);
    //
    // }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.isMapViewModalOpen}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <MapView
                    style={{flex: 1}}
                >
                    {this.props.ptChain.map((pt, index) => {
                        const coords = {
                            latitude: pt.latitude,
                            longitude: pt.longitude,
                        };
                        const metadata = `Status: ${pt.productTagId}`;
                        // const markerScannedPTHashRef = (this.props.ptHash === pt.productTagHash) ?
                        //     SCANNED_HASH_MARKER_REF : null;

                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={coords}
                                title={"Some title"}
                                description={metadata}
                                // ref={markerScannedPTHashRef}
                                // style={markerScannedPTHashRef ? {zIndex: 0} : {}}
                            >
                                <CustomMarker
                                    title={index + 1}
                                    diffColor={pt.productTagHash === this.props.ptHash}
                                    // style={markerScannedPTHashRef ? {zIndex: 0} : {}}
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
                <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() => this.props.onModalClose()}
                >
                    <Text style={{fontWeight: 'bold', color: 'black',}}>
                        Close Map
                    </Text>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: () => dispatch(closeMapViewModal()),
    }
};

const mapStateToProps = state => {
    return {
        isMapViewModalOpen: state.ui.isMapViewModalOpen,
        ptChain: state.map.ptChain,
        ptHash: state.map.hash
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapViewModal);

const styles = StyleSheet.create({
    mapButton: {
        width: 120,
        height: 40,
        borderRadius: 85/2,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: 'black',
        shadowRadius: 8,
        shadowOpacity: 0.12,
        // opacity: .6,
        backgroundColor: 'silver',
        position: 'absolute',//use absolute position to show button on top of the map
        top: '90%', //for center align
        right: 10,
        alignSelf: 'flex-end' //for align to right
    }
});