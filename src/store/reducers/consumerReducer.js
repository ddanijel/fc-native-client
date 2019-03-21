import {SET_PRODUCT_TAG_ACTION} from "../actions/actionTypes";

const initialState = {
    scannedProductTag: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_TAG_ACTION:
            return {
                scannedProductTag: action.productTag
            };
        default:
            return state;
    }
};

export default reducer;