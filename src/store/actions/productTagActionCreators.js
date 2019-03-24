import {
    SET_FETCHED_PT_ACTION,
    PREPARE_STATE_FOR_QR_SCANNER_SCREEN_ACTION, PT_DOES_NOT_EXIST_ACTION
} from "./actionTypes";

import {closePtMapViewModal, openPtMapViewModal, closeQrScanner, openQrScanner} from "./uiActionCreators";



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
                    dispatch(setPTDoesNotExist())
                    // alert("There is no product tag for the give hash");
                }
                // thisRef.props.navigation.navigate('Map');
                dispatch(setFetchedPTChain(hash, ptChain));
                dispatch(openPtMapViewModal());
            })
    }
};


export const onScanAgainPressed = () => {
    return dispatch => {
        dispatch(prepareStateForQrCodeScannerScreen());
        dispatch(openQrScanner())
    }
};

export const setFetchedPTChain = (scannedHash, ptChain) => {
    return {
        type: SET_FETCHED_PT_ACTION,
        ptChain,
        scannedHash
    }
};

export const setPTDoesNotExist = () => {
    return {
        type: PT_DOES_NOT_EXIST_ACTION
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