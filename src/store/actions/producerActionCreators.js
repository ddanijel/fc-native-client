import {
    AUTH_SET_JWT_TOKEN_ACTION,
    LOG_IN_ACTION,
    SET_PRODUCER_DATA_ACTION,
    SET_SIGN_UP_FORM_INIT_DATA_ACTION,
    SIGN_UP_ACTION,
    SCANNED_PT_VALID_ACTION,
    OPEN_ALERT_ON_SCAN_ACTION,
    CLOSE_ALERT_ON_SCAN_ACTION,
    SET_SCANNED_PT_ACTION,
    SET_PT_FOR_MAP_VIEW_ACTION
} from "./actionTypes";

import {uiStartLoading, uiStopLoading} from "./uiActionCreators";


export const fetchSignUpFormData = () => {
    return dispatch => {
        fetch("https://foodchain-csg.ch/api/v2/producers/registerData")
            .catch(error => {
                alert("Error while fetching form data from the server.");
                console.error(error);
            })
            .then(response => response.json())
            .then(jsonResult => {

                const actions = jsonResult.actions;
                const certificates = jsonResult.certificates;

                const signUpFormInitData = {
                    actions,
                    certificates
                };
                dispatch(setInitSignUpFormData(signUpFormInitData));
            })
    }
};

export const tryAuth = (authData, authMode, thisRef) => {
    return dispatch => {
        switch (authMode) {
            case LOG_IN_ACTION :
                dispatch(authLogin(authData, thisRef));
                break;
            case SIGN_UP_ACTION :
                dispatch(authSignUp(authData, thisRef));
                break;
        }
    };

};

export const authLogin = (authData, thisRef) => {
    const {username, password} = authData;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://foodchain-csg.ch/api/v1/producers/login", {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .catch(error => {
                console.error("Error: ", error);
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading())
            })
            .then(result => result.json())
            .then(jsonResult => {
                dispatch(uiStopLoading());
                if (!jsonResult.token || !jsonResult.resourceId) {
                    alert("Authentication failed. Please try again.");
                } else {
                    dispatch(authSetJwtToken(jsonResult.token, jsonResult.resourceId));
                    thisRef.props.navigation.navigate('Producer')
                }
            });
    };
};

export const authSignUp = (authData, thisRef) => {

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://foodchain-csg.ch/api/v1/producers/register", {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(error => {
                console.error("Error: ", error);
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading())
            })
            .then(result => result.json())
            .then(jsonResult => {
                dispatch(uiStopLoading());
                if (!jsonResult.token || !jsonResult.resourceId) {
                    alert("Authentication failed. Please try again.");
                } else {
                    dispatch(authSetJwtToken(jsonResult.token, jsonResult.resourceId));
                    thisRef.props.navigation.navigate('Producer')
                }
            });
    };
};

export const fetchProducerData = (token, producerId) => {
    return dispatch => {
        fetch(`https://foodchain-csg.ch/api/v1/producers/${producerId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => {
                alert("Error while fetching producer's data from the server.");
                console.error(error);
            })
            .then(response => {
                return response.json()
            })
            .then(jsonResult => {
                dispatch(setProducerData(jsonResult));
            })
    }
};

// todo Continue here, now we have a token. the next step is to create a pt
export const authGetJwtToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().producer.jwtToken;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
    }
};


export const setInitSignUpFormData = signUpFormInitData => {
    return {
        type: SET_SIGN_UP_FORM_INIT_DATA_ACTION,
        signUpFormInitData
    }
};

export const setProducerData = producerData => {
    return {
        type: SET_PRODUCER_DATA_ACTION,
        producerData
    }
};

export const authSetJwtToken = (token, producerId) => {
    return {
        type: AUTH_SET_JWT_TOKEN_ACTION,
        token,
        producerId
    }
};


export const fetchPTByHash = (hash) => {
    return dispatch => {
        fetch(`https://foodchain-csg.ch/api/v2/productTags/hash/${hash}`)
            .catch(error => {
                alert("Error while fetching product tag data from the server.");
                console.error(error);
            })
            .then(response => response.json())
            .then(ptChain => {
                if (ptChain.length === 0) {
                    dispatch(scannedProductTagValid(false));
                } else {
                    dispatch(scannedProductTagValid(true));
                    dispatch(setScannedPT(hash, ptChain))
                }
            })
    }
};

export const scannedProductTagValid = valid => {
    return {
        type: SCANNED_PT_VALID_ACTION,
        valid
    }
};

export const openAlertOnScan = () => {
    return {
        type: OPEN_ALERT_ON_SCAN_ACTION
    }
};

export const closeAlertOnScan = () => {
    return {
        type: CLOSE_ALERT_ON_SCAN_ACTION
    }
};

export const setScannedPT = (hash, ptChain) => {
    return {
        type: SET_SCANNED_PT_ACTION,
        scannedProductTag: {
            hash,
            ptChain
        }
    }
};

export const setPTForMapView = pt => {
    return {
        type: SET_PT_FOR_MAP_VIEW_ACTION,
        pt
    }
};