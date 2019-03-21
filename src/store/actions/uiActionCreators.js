import {
    UI_START_LOADING_ACTION,
    UI_STOP_LOADING_ACTION,
    OPEN_PT_MAP_VIEW_MODAL_ACTION,
    CLOSE_PT_MAP_VIEW_MODAL_ACTION,
    OPEN_QR_CODE_SCANNER_ACTION,
    CLOSE_QR_CODE_SCANNER_ACTION
} from "./actionTypes";


export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING_ACTION
    };
};


export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING_ACTION
    };
};

export const openQrScanner = () => {
    return {
        type: OPEN_QR_CODE_SCANNER_ACTION
    };
};

export const closeQrScanner = () => {
    return {
        type: CLOSE_QR_CODE_SCANNER_ACTION
    };
};

export const openPtMapViewModal = () => {
    return {
        type: OPEN_PT_MAP_VIEW_MODAL_ACTION
    };
};

export const closePtMapViewModal = () => {
    return {
        type: CLOSE_PT_MAP_VIEW_MODAL_ACTION
    };
};