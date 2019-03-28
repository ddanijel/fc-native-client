import React from 'react';
import {ScrollView, StyleSheet, View, Alert} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";

import Layout from '../constants/Layout'

const ProducerCertificateList = props => {
    return (
        <View>
            <ScrollView style={{height: Layout.window.height * props.heightPercent}}>
                {props.certificates.map(certificate => (
                    <ListItem title={certificate.certificateName}
                              key={Math.random()} switch={{
                        value: props.selectedCertificates.some(act => act.certificateName === certificate.certificateName),
                        onValueChange: value => props.onCertificateToggleChange(value, certificate)
                    }} bottomDivider/>
                ))}
            </ScrollView>

            <Input
                style={{width: '100%'}}
                containerStyle={[styles.inputContainerStyle]}
                placeholder="Enter new certificate"
                value={props.newCertificateValue}
                onChangeText={newCertificate => props.onNewCertificateChangeText(newCertificate)}
                // ref={ref => (this.shakeInput2 = ref)}
                rightIcon={
                    <Button
                        title="Add"
                        onPress={() => {
                            if (props.newCertificateValue.length < 3) {
                                Alert.alert(
                                    'Error',
                                    'Value not valid'
                                )
                            } else {
                                props.onAddNewCertificate();
                                Alert.alert(
                                    'Success',
                                    `Certificate successfully added. Value: ${props.newCertificateValue}`
                                )
                            }
                        }}
                    />
                }
                // errorMessage="Shake me on error !"
            />
        </View>
    );
};

export default ProducerCertificateList;

const styles = StyleSheet.create({
    inputContainerStyle: {
        marginTop: 16,
        width: '100%',
    }
});