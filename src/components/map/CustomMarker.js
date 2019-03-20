import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, Text, View,} from 'react-native';

const propTypes = {
    title: PropTypes.number.isRequired,
    fontSize: PropTypes.number,
};

const defaultProps = {
    fontSize: 22,
};

class CustomMarker extends React.Component {
    render() {
        const {fontSize, title} = this.props;
        return (
            <View style={styles.container}>
                <View style={this.props.diffColor ? {...styles.bubble, backgroundColor: '#22FF00'} : styles.bubble}>
                    <Text style={[styles.title, {fontSize}]}>{title}</Text>
                </View>
                <View style={styles.arrowBorder}/>
                <View style={styles.arrow}/>
            </View>
        );
    }
}

CustomMarker.propTypes = propTypes;
CustomMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#FF5A5F',
        padding: 2,
        borderRadius: 3,
        borderColor: '#D23F44',
        borderWidth: 0.5,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: 'transparent',
        borderTopColor: '#FF5A5F',
        alignSelf: 'center',
        marginTop: -9,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: 'transparent',
        borderTopColor: '#D23F44',
        alignSelf: 'center',
        marginTop: -0.5,
    },
});

export default CustomMarker;