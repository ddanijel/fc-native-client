import {SET_FETCHED_PT} from "../actions/actionTypes";
import sortArray from "../../util/sortutil";



const initialState = {
    scannedPTChain: [],
    scannedHash: ''
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCHED_PT :
        {
            console.log("pt action: ", action);
            return {
                ...state,
                scannedPTChain: sortProductTags(action.ptChain),
                scannedHash: action.scannedHash
            };
        }
        default:
            return state;
    }
};

const sortProductTags = ptChain => {
    const updatedPTChain = ptChain.map(
        productTag => {
            return {
                ...productTag,
                dateTime: new Date(productTag.dateTime)
            }
        });
    return updatedPTChain.sort(sortArray('productTagId'));
};

export default reducer;