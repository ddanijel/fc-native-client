import {
    SET_FETCHED_PT
} from "./actionTypes";

import {uiStartLoading, uiStopLoading} from "./uiActionCreators";


export const fetchPTByHash = (hash, thisRef) => {
    return dispatch => {
        fetch(`https://foodchain-csg.ch/api/v2/productTags/hash/${hash}`)
            .catch(error => {
                alert("Error while fetching product tag data from the server.");
                console.log(error);
            })
            .then(response => response.json())
            .then(ptChain => {
                if (ptChain.length === 0) {
                    alert("There is no product tag for the give hash");
                }
                thisRef.props.navigation.navigate('Map');
                dispatch(setFetchedPTChain(ptChain));
            })
    }
};

export const setFetchedPTChain = ptChain => {
    return {
        type: SET_FETCHED_PT,
        ptChain
    }
};
