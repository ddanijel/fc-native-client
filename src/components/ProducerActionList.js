import React from 'react';
import {ScrollView, StyleSheet, View, Alert} from "react-native";
import {Button, Input, ListItem} from "react-native-elements";

import Layout from '../constants/Layout'

const ProducerActionList = props => {
    return (
        <View>
            <ScrollView style={{height: Layout.window.height * props.heightPercent}}>
                {props.actions.map(action => (
                    <ListItem title={action.actionName}
                              key={Math.random()} switch={{
                        value: props.selectedActions.some(act => act.actionName === action.actionName),
                        onValueChange: value => props.onActionToggleChange(value, action)
                    }} bottomDivider/>
                ))}
            </ScrollView>

            <Input
                style={{width: '100%'}}
                containerStyle={[styles.inputContainerStyle]}
                placeholder="Enter new Action"
                value={props.newActionValue}
                onChangeText={newAction => props.onNewActionChangeText(newAction)}
                // ref={ref => (this.shakeInput2 = ref)}
                rightIcon={
                    <Button
                        title="Add"
                        onPress={() => {
                            if (props.newActionValue.length < 3) {
                                Alert.alert(
                                    'Error',
                                    'Value not valid'
                                )
                            } else {
                                props.onAddNewAction();
                                Alert.alert(
                                    'Success',
                                    `Action successfully added. Value: ${props.newActionValue}`
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

export default ProducerActionList;

const styles = StyleSheet.create({
    inputContainerStyle: {
        marginTop: 16,
        width: '100%',
    }
});