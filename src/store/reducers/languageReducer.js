import * as actionTypes from '../actions/actionTypes';

const enTranslation = {
    languageIndex: 0,
    producerTitle: 'Producer',
    consumerTitle: 'Consumer',
    language: 'Language',
    aboutUs: 'About us',
    contactUs: 'Contact us',
    scanButton: 'Scan Product',
    university: 'University of Zurich',
    mapOpenFullScreen: 'Full Screen',
    mapCloseFullScreen: 'Close Full Screen',
    productTagDetails: 'Product Tag Details',
    productTagActions: 'Product Tag Actions',
    logIn: 'Login',
    signUp: 'Sign up',
    signOut: 'Sign Out',
    username: 'Username',
    password: 'Password',
    atLeast8Characters: 'Please enter at least 8 characters',
    producerName: 'Producer Name',
    licenceNumber: 'Licence Number',
    confirmPassword: 'Confirm Password',
    samePasswordError: 'Please enter the same password',
    scannedProducts: 'Scanned Products',
    ethereumAccount: 'Ethereum Account',
    websiteUrl: 'Your Website URL',
    certificates: 'Certificates',
    valueNotValid: 'Value not valid',
    enterNewCertificate: 'Enter new Certificate',
    error: 'Error',
    success: 'Success',
    certificateCreated: 'Certificate successfully added. Value:',
    defaultActions: 'Default Actions',
    enterNewAction: 'Enter new Action',
    actionCreated: 'Action successfully added. Value:',
    add: 'Add',
    loginUppercase: 'LOGIN',
    signUpUppercase: 'SIGN UP',
    producerMode: 'Producer Mode',
    settings: 'Settings',
    allMyProducts: 'All My Products',
    generatePTButton: 'Generate Product Tag',

};

const deTranslation = {
    languageIndex: 1,
    producerTitle: 'ProducerDE',
    consumerTitle: 'ConsumerDE',
    language: 'Sprache',
    aboutUs: 'Über uns',
    contactUs: 'Wenden Sie sich an uns.',
    scanButton: 'Scan Produkt',
    university: 'Universität Zürich',
    mapOpenFullScreen: 'Vollbild',
    mapCloseFullScreen: 'Vollbild schliessen',
    productTagDetails: 'Product Beschreibung',
    productTagActions: 'Produkt Aktionen',
    logIn: 'Anmelden'
};

const initialState = {
    languages: ['EN', 'DE', 'FR', 'IT'],
    defaultLanguage: 'EN',
    currentLanguage: 'EN',
    translations: enTranslation
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE_ACTION:
            let translation = state.translations;
            switch (action.payload) {
                case 0:
                    translation = enTranslation;
                    break;
                case 1 :
                    translation = deTranslation;
                    break;
            }
            return {
                ...state,
                currentLanguage: action.payload,
                translations: translation
            };
        default:
            return state;
    }
};

export default reducer;
