import React from 'react';
import {View, ScrollView, StyleSheet} from "react-native";
import {Card, ListItem, Text} from "react-native-elements";

const ProductTagDetails = props => {
    // console.log("ProductTagDetails: ", props.productTag);
    const {
        productTagId,
        dateTime,
        productTagHash,
        productTagActions,
        longitude,
        latitude,
        productTagProducer,
        previousProductTagHashes
    } = props.productTag;
    return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={{fontWeight: 'bold'}} h4>
                        Product Tag Details
                    </Text>
                    <ListItem
                        title={new Date(dateTime).toLocaleDateString()}
                        titleStyle={styles.titleStyle}
                        subtitle={"Date"}
                        subtitleStyle={styles.subtitleStyle}
                        bottomDivider
                    />

                    <ListItem
                        title={productTagHash}
                        titleStyle={styles.titleStyle}
                        subtitle={"Product Tag Hash"}
                        subtitleStyle={styles.subtitleStyle}
                        bottomDivider
                    />

                    <Card containerStyle={{marginLeft: 0, marginRight: 0}} title="Product Tag Actions">
                        {productTagActions.map((action, index) => (
                            <ListItem
                                key={index}
                                title={`${index + 1}. ${action.actionName}`}
                                titleStyle={styles.titleStyle}
                                style={{marginTop: -15, marginLeft: -15}}
                                // subtitle={"Producer Name"}
                                // subtitleStyle={styles.subtitleStyle}
                                // bottomDivider
                            />
                        ))}

                    </Card>

                    <Card containerStyle={{marginLeft: 0, marginRight: 0}} title="Product Tag Producer">
                        <ListItem
                            style={{marginTop: -15, marginLeft: -15}}
                            title={productTagProducer.producerName}
                            titleStyle={styles.titleStyle}
                            subtitle={"Producer Name"}
                            subtitleStyle={styles.subtitleStyle}
                            bottomDivider
                        />
                        <ListItem
                            style={{marginLeft: -15}}
                            title={productTagProducer.licenceNumber}
                            titleStyle={styles.titleStyle}
                            subtitle={"Producer Licence Number"}
                            subtitleStyle={styles.subtitleStyle}
                            bottomDivider
                        />
                        <ListItem
                            style={{marginLeft: -15, marginBottom: -15}}
                            title={productTagProducer.url}
                            titleStyle={styles.titleStyle}
                            subtitle={"Producer URL"}
                            subtitleStyle={styles.subtitleStyle}
                        />
                    </Card>
                </ScrollView>
            </View>

    );
};

export default ProductTagDetails;

const styles = StyleSheet.create({
    titleStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    subtitleStyle: {
        color: 'silver',
        fontSize: 12,
    }
});
