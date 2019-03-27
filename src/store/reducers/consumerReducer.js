import {SET_CONSUMER_SCANNED_PT_ACTION} from "../actions/actionTypes";

import getUpdatedPTToAdd from "../../util/ptUpdateUtil";

const initialState = {
    hash: null,
    ptDetails: null,
    ptChain: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONSUMER_SCANNED_PT_ACTION:
            const {hash, ptDetails, ptChain} = getUpdatedPTToAdd(action.scannedProductTag);
            return {
                hash,
                ptDetails,
                ptChain
            };
        default:
            return state;
    }
};

export default reducer;