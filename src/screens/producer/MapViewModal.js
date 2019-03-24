import React, {Component} from 'react';
import {Alert, Dimensions, Modal, View} from "react-native";
import {closeProducerMapViewModal} from "../../store/actions/uiActionCreators";
import {connect} from "react-redux";
import {MapView} from "expo";
import CustomMarker from "../map/MapScreen";
import ProductTagDetails from "../../components/productTag/ProductTagDetails";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCANNED_HASH_MARKER_REF = 'SCANNED_HASH_MARKER_REF';

class MapViewModal extends Component {

    componentWillReceiveProps(nextProps, nextContext) {
        setTimeout(function () {
            this.refs.SCANNED_HASH_MARKER_REF.showCallout();
        }.bind(this), 1000);

    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.isProducerMapViewModalOpen}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <MapView
                    style={{flex: 1}}
                >
                    {/*{this.props.pt.ptChain.map((pt, index) => {*/}
                        {/*console.log('pt map view: ', pt);*/}
                        {/*const coords = {*/}
                            {/*latitude: pt.latitude,*/}
                            {/*longitude: pt.longitude,*/}
                        {/*};*/}
                        {/*const metadata = `Status: ${pt.productTagId}`;*/}
                        {/*const markerScannedPTHashRef = (this.props.scannedHash === pt.productTagHash) ?*/}
                            {/*SCANNED_HASH_MARKER_REF : null;*/}

                        {/*return (*/}
                            {/*<MapView.Marker*/}
                                {/*key={index}*/}
                                {/*coordinate={coords}*/}
                                {/*title={"Some title"}*/}
                                {/*description={metadata}*/}
                                {/*ref={markerScannedPTHashRef}*/}
                                {/*style={markerScannedPTHashRef ? {zIndex: 0} : {}}*/}
                            {/*>*/}
                                {/*<CustomMarker*/}
                                    {/*title={index + 1}*/}
                                    {/*diffColor={pt.productTagHash === pt.hash}*/}
                                    {/*style={markerScannedPTHashRef ? {zIndex: 0} : {}}*/}
                                {/*/>*/}

                                {/*<MapView.Callout>*/}
                                    {/*<View style={{width: SCREEN_WIDTH * 0.7, height: SCREEN_HEIGHT * 0.6}}>*/}
                                        {/*<ProductTagDetails productTag={pt}/>*/}
                                    {/*</View>*/}
                                {/*</MapView.Callout>*/}

                            {/*</MapView.Marker>*/}
                        {/*);*/}
                    {/*})}*/}
                    <MapView.Marker
                        coordinate={{latitude: 37.78825,
                            longitude: -122.4324}}
                        title={"title"}
                        description={"description"}
                    />
                </MapView>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: () => dispatch(closeProducerMapViewModal()),
    }
};

const mapStateToProps = state => {
    return {
        isProducerMapViewModalOpen: state.ui.isProducerMapViewModalOpen,
        pt: state.producer.ptForMapView
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapViewModal);