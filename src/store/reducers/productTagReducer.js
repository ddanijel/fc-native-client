import {PREPARE_STATE_FOR_QR_SCANNER_SCREEN_ACTION, SET_FETCHED_PT_ACTION} from "../actions/actionTypes";
import sortArray from "../../util/sortutil";



const initialState = {
    scannedPTChain: [],
    scannedHash: ''
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCHED_PT_ACTION :
        {
            return {
                ...state,
                scannedPTChain: sortProductTags(action.ptChain),
                scannedHash: action.scannedHash
            };
        }
        case PREPARE_STATE_FOR_QR_SCANNER_SCREEN_ACTION:
        {
            return {
                scannedPTChain: [],
                scannedHash: ''
            }
        }
        default:
            return state;
    }
};

const sortProductTags = ptChain => {
    const updatedPTChain = ptChain.map(
        productTag => {
            return {
                ...productTag,
                dateTime: new Date(productTag.dateTime)
            }
        });
    return updatedPTChain.sort(sortArray('productTagId'));
};

export default reducer;