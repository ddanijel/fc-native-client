import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    OPEN_PT_MAP_VIEW_MODAL,
    CLOSE_PT_MAP_VIEW_MODAL
} from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    isMapModalOpen: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case OPEN_PT_MAP_VIEW_MODAL:
            return {
                ...state,
                isMapModalOpen: true
            };
        case CLOSE_PT_MAP_VIEW_MODAL:
            return {
                ...state,
                isMapModalOpen: false
            };
        default:
            return state;
    }
};

export default reducer;