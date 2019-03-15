import {
    SET_SIGN_UP_FORM_INIT_DATA,
    LOG_IN,
    SIGN_UP
} from "./actionTypes";

import {uiStartLoading, uiStopLoading} from "./uiActionCreators";


export const fetchSignUpFormData = () => {
    return dispatch => {
        fetch("https://foodchain-csg.ch/api/v2/producers/registerData")
            .catch(error => {
                alert("Error while fetching form data from the server.");
                console.log(error);
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

export const setInitSignUpFormData = signUpFormInitData => {
    return {
        type: SET_SIGN_UP_FORM_INIT_DATA,
        signUpFormInitData
    }
};

export const tryAuth = (authData, authMode, thisRef) => {
    return dispatch => {
        switch (authMode) {
            case LOG_IN :
                dispatch(authLogin(authData, thisRef));
                break;
            case SIGN_UP :
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
    console.log("Sending data: ", formData);

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://foodchain-csg.ch/api/v1/producers/login", {
            method: 'POST',
            body: formData,
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
                if (jsonResult.errors) {
                    const errors = Object.values(jsonResult.errors);
                    alert("Authentication failed. Error: ", errors);
                } else {
                    console.log("success: ", jsonResult);
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
                if (jsonResult.errors) {
                    const errors = Object.values(jsonResult.errors);
                    alert("Authentication failed. Error: ", errors);
                } else {
                    console.log("signup success: ", jsonResult);
                    thisRef.props.navigation.navigate('Producer')
                }
            });
    };
};