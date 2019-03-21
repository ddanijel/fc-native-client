import {
    SET_FETCHED_PT_ACTION,
    PREPARE_STATE_FOR_QR_SCANNER_SCREEN_ACTION
} from "./actionTypes";

import {closePtMapViewModal, openPtMapViewModal, closeQrScanner} from "./uiActionCreators";

import {Alert} from "react-native";


export const fetchPTByHash = (hash) => {
    return dispatch => {
        fetch(`https://foodchain-csg.ch/api/v2/productTags/hash/${hash}`)
            .catch(error => {
                alert("Error while fetching product tag data from the server.");
                console.error(error);
            })
            .then(response => response.json())
            .then(ptChain => {
                if (ptChain.length === 0) {
                    dispatch(closeQrScanner());
                    showAlertPtDoesNotExist();
                    // alert("There is no product tag for the give hash");
                }
                // thisRef.props.navigation.navigate('Map');
                dispatch(setFetchedPTChain(hash, ptChain));
                dispatch(openPtMapViewModal());
            })
    }
};

const showAlertPtDoesNotExist = () => {
    Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
};

export const setFetchedPTChain = (scannedHash, ptChain) => {
    return {
        type: SET_FETCHED_PT_ACTION,
        ptChain,
        scannedHash
    }
};


export const prepareStateForQrCodeScannerScreen = () => {
    return dispatch => {
        dispatch(closePtMapViewModal());
        dispatch(initializeScannedPtState());
    };
};

export const initializeScannedPtState = () => {
    return {
        type: PREPARE_STATE_FOR_QR_SCANNER_SCREEN_ACTION
    }
};