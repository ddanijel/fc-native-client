import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    OPEN_PT_MAP_VIEW_MODAL,
    CLOSE_PT_MAP_VIEW_MODAL
} from "./actionTypes";


export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};


export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const openPtMapViewModal = () => {
    return {
        type: OPEN_PT_MAP_VIEW_MODAL
    };
};

export const closePtMapViewModal = () => {
    return {
        type: CLOSE_PT_MAP_VIEW_MODAL
    };
};