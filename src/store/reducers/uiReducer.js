import {
    CLOSE_PT_MAP_VIEW_MODAL_ACTION,
    CLOSE_QR_CODE_SCANNER_ACTION,
    OPEN_PT_MAP_VIEW_MODAL_ACTION,
    OPEN_QR_CODE_SCANNER_ACTION,
    UI_START_LOADING_ACTION,
    UI_STOP_LOADING_ACTION,
    OPEN_PRODUCER_QR_SCANNER_MODAL_ACTION,
    CLOSE_PRODUCER_QR_SCANNER_MODAL_ACTION,
    OPEN_PRODUCER_MAP_VIEW_MODAL_ACTION,
    CLOSE_PRODUCER_MAP_VIEW_MODAL_ACTION
} from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    isMapModalOpen: false,
    isQrCodeScannerOpen: false,
    isProducerQrScannerModalOpen: false,
    isProducerMapViewModalOpen: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING_ACTION:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING_ACTION:
            return {
                ...state,
                isLoading: false
            };
        case OPEN_PT_MAP_VIEW_MODAL_ACTION:
            return {
                ...state,
                isMapModalOpen: true
            };
        case CLOSE_PT_MAP_VIEW_MODAL_ACTION:
            return {
                ...state,
                isMapModalOpen: false
            };
        case OPEN_QR_CODE_SCANNER_ACTION:
            return {
                ...state,
                isQrCodeScannerOpen: true
            };
        case CLOSE_QR_CODE_SCANNER_ACTION:
            return {
                ...state,
                isQrCodeScannerOpen: false
            };
        case OPEN_PRODUCER_QR_SCANNER_MODAL_ACTION:
            return {
                ...state,
                isProducerQrScannerModalOpen: true
            };
        case CLOSE_PRODUCER_QR_SCANNER_MODAL_ACTION:
            return {
                ...state,
                isProducerQrScannerModalOpen: false
            };
        case OPEN_PRODUCER_MAP_VIEW_MODAL_ACTION:
            return {
                ...state,
                isProducerMapViewModalOpen: true
            };
        case CLOSE_PRODUCER_MAP_VIEW_MODAL_ACTION:
            return {
                ...state,
                isProducerMapViewModalOpen: false
            };
        default:
            return state;
    }
};

export default reducer;