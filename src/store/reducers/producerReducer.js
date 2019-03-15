import {SET_SIGN_UP_FORM_INIT_DATA} from "../actions/actionTypes";


const initialState = {
    scannedProductTags: [],
    actions: [],
    activeProducer: {},
    jwtToken: null,
    signUpFormInitData: {
        actions: [],
        certificates: []
    }
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGN_UP_FORM_INIT_DATA :
            return {
                ...state,
                signUpFormInitData: {
                    actions: action.signUpFormInitData.actions,
                    certificates: action.signUpFormInitData.certificates
                }
            };
        default:
            return state;
    }
};

export default reducer;