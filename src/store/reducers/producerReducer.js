import {
    SET_SIGN_UP_FORM_INIT_DATA_ACTION,
    AUTH_SET_JWT_TOKEN_ACTION,
    SET_PRODUCER_DATA_ACTION,
    SCANNED_PT_VALID_ACTION,
    OPEN_ALERT_ON_SCAN_ACTION,
    CLOSE_ALERT_ON_SCAN_ACTION,
    SET_PRODUCER_SCANNED_PT_ACTION,
    // SCANNED_PT_ALREADY_SCANNED_ACTION,
    // SET_PT_FOR_MAP_VIEW_ACTION
} from "../actions/actionTypes";

import getUpdatedPTToAdd from "../../util/ptUpdateUtil";
import checkIfAlreadyScanned from "../../util/ptCheckIfScannedUtil";


const initialState = {
    scannedProductTags: [],
    // ptForMapView: [],
    scannedProductTagAlreadyScanned: false,
    isAlertOnScanOpen: false,
    actions: [],
    activeProducer: null,
    activeProducerId: null,
    jwtToken: null,
    signUpFormInitData: {
        actions: [],
        certificates: []
    }
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGN_UP_FORM_INIT_DATA_ACTION :
            return {
                ...state,
                signUpFormInitData: {
                    actions: action.signUpFormInitData.actions,
                    certificates: action.signUpFormInitData.certificates
                }
            };
        case AUTH_SET_JWT_TOKEN_ACTION :
            return {
                ...state,
                jwtToken: action.token,
                activeProducerId: action.producerId
            };
        case SET_PRODUCER_DATA_ACTION: {
            return {
                ...state,
                activeProducer: action.producerData
            }
        }
        case OPEN_ALERT_ON_SCAN_ACTION: {
            return {
                ...state,
                isAlertOnScanOpen: true
            }
        }
        case CLOSE_ALERT_ON_SCAN_ACTION: {
            return {
                ...state,
                isAlertOnScanOpen: false
            }
        }
        case SET_PRODUCER_SCANNED_PT_ACTION: {
            const updatedProductTag = getUpdatedPTToAdd(action.scannedProductTag);
            const alreadyScanned = checkIfAlreadyScanned(state.scannedProductTags, updatedProductTag);
            return alreadyScanned ? {
                ...state,
                scannedProductTagAlreadyScanned: true
            } : {
                ...state,
                scannedProductTags: [...state.scannedProductTags, updatedProductTag],
                scannedProductTagAlreadyScanned: false
            }
        }
        // case SET_PT_FOR_MAP_VIEW_ACTION: {
        //     return {
        //         ...state,
        //         ptForMapView: action.pt
        //     }
        // }
        default:
            return state;
    }
};

export default reducer;