export const SCAN_PRODUCT_TAG = 'SCAN_PRODUCT_TAG';
export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const FETCH_SIGN_UP_FORM_DATA = 'FETCH_SIGN_UP_FORM_DATA';
export const CHANGE_LANGUAGE_ACTION = 'CHANGE_LANGUAGE_ACTION';


export const changeLanguage = (index) => {
    return {
        type: CHANGE_LANGUAGE_ACTION,
        payload: index
    }
};