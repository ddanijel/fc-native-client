import React from 'react';
import {Button, Text, View} from 'react-native';

class ConsumerScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Consumer page</Text>
                <Text>Please scan a product tag hash</Text>
                <Button
                    title="Welcome screen"
                    onPress={() => this.props.navigation.navigate('Welcome')}
                />
            </View>
        );
    }
}

export default ConsumerScreen;