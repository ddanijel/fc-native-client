import {
    SCANNED_PT_VALID_ACTION,
} from "../actions/actionTypes";

const initialState = {
    scannedProductTagValid: true
};

// very simple reducer since the product tags are kept in two corresponding reducers (consumer/producer)

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SCANNED_PT_VALID_ACTION: {
            return {
                ...state,
                scannedProductTagValid: action.valid
            }
        }
        default:
            return state;
    }
};

export default reducer;