import React, {ReactHTMLElement} from 'react';
import {Card, ListItem} from "react-native-elements";
import {Print, } from "expo";
import QRCode from 'qrcode'

import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import Layout from "../../constants/Layout";
import {images} from "../../../assets/images";
import {
    onProducersAllPTScreenOpen
} from "../../store/actions/producerActionCreators";
import {openMapViewModal} from "../../store/actions/uiActionCreators";
import {setPTForMapView} from "../../store/actions/mapActionCreators";
import {connect} from "react-redux";

class AllProductsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'All Products'
        }
    };

    componentDidMount() {
        const {jwtToken, activeProducerId} = this.props;
        this.props.onProducersAllPTScreenOpen(jwtToken, activeProducerId)
    }

    onPTButtonGroupPressed = async (index, pt, hash) => {
        switch (index) {
            case 0: {
                this.showPTDetails(pt);
            }
            case 1: {
                await this.printQrCode(hash);
            }
        }
    };

    showPTDetails = productTag => {
        this.props.setPTForMapView(productTag);
        this.props.onMapViewModalOpen();
    };

    printQrCode = async hash => {

        const qrcode = await this.generateQr(hash);
        console.log(qrcode);
        // Print.printAsync({
        //     html: `<style>html, body { width: 5cm; height: 5cm; }</style><div>${qrcode}</div>`,
        // });

        await Print.printAsync({
            html: `<div>${qrcode}</div>`
        });

    };

    generateQr = async hash => {
        try {
            return await QRCode.toString(hash);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {width, height} = Layout.window;
        return (
            <ImageBackground source={images.background} style={styles.bgImage}>
                <Card style={{
                    width: width,
                    height: height * 0.8
                }} title="Scanned Products">
                    <View style={{
                        height: height * 0.7,
                        width: width * 0.8
                    }}>
                        <ScrollView>
                            {this.props.productTags.map(pt => {
                                const hash = pt.hash;
                                return <ListItem key={hash}
                                                 title={new Date(pt.ptDetails.dateTime).toDateString()}
                                                 buttonGroup={{
                                                     buttons: ['Details', 'Print QR'],
                                                     onPress: (index) => this.onPTButtonGroupPressed(index, pt, hash)
                                                 }}
                                />
                            })}
                        </ScrollView>
                    </View>
                </Card>
            </ImageBackground>
        );
    }
}


const mapStateToProps = state => {
    return {
        producerData: state.producer.activeProducer,
        activeProducerId: state.producer.activeProducerId,
        jwtToken: state.producer.jwtToken,
        isMapViewModalOpen: state.ui.isMapViewModalOpen,
        isLoading: state.ui.isLoading,
        productTags: state.producer.allProducersProductTags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMapViewModalOpen: () => dispatch(openMapViewModal()),
        setPTForMapView: productTag => dispatch(setPTForMapView(productTag)),
        onProducersAllPTScreenOpen: (token, producerId) => dispatch(onProducersAllPTScreenOpen(token, producerId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsScreen);


const styles = StyleSheet.create({
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