import {SET_SIGN_UP_FORM_INIT_DATA_ACTION, AUTH_SET_JWT_TOKEN_ACTION} from "../actions/actionTypes";


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
                jwtToken: action.token
            };
        default:
            return state;
    }
};

export default reducer;