import React from 'react';
import {Card} from "react-native-elements";
import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import Layout from "../../constants/Layout";
import {images} from "../../../assets/images";

class AllProductsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'All Products'
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
                            {/*{this.props.scannedProductTags.map(pt => {*/}
                            {/*    const hash = pt.hash;*/}
                            {/*    return <ListItem key={hash}*/}
                            {/*                     title={pt.ptDetails.dateTime}*/}
                            {/*                     buttonGroup={{*/}
                            {/*                         buttons: ['Details', 'Remove'],*/}
                            {/*                         onPress: (index) => this.onScannedProductButtonGroupPressed(index, pt, hash)*/}
                            {/*                     }}*/}
                            {/*    />*/}
                            {/*})}*/}
                        </ScrollView>
                    </View>
                </Card>
            </ImageBackground>
        );
    }
}


export default AllProductsScreen;


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