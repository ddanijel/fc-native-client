import * as actionTypes from '../actions/actionTypes';

const enTranslation = {
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
    productTagActions: 'Product Tag Action'

};

const deTranslation = {
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
    productTagActions: 'Produkt Aktionen'
};

const initialState = {
    languages: ['EN', 'DE', 'FR', 'IT'],
    defaultLanguage: 'DE',
    currentLanguage: 'DE',
    translations: deTranslation
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE_ACTION:
            let translation = enTranslation;
            switch (action.payload) {
                case 'EN':
                    translation = enTranslation;
                    break;
                case 'DE' :
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
