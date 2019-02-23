import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";

import languageReducer from './reducers/languageReducer';
import consumerReducer from './reducers/consumerReducer';
import producerReducer from './reducers/producerReducer';


const rootReducer = combineReducers({
    languages: languageReducer,
    consumer: consumerReducer,
    producer: producerReducer
});

const addLoggingToDispatch = store => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return action => {
        console.group(action.type);
        console.log("%c prev state", "color: gray", store.getState());
        console.log("%c action", "color: blue", action);
        const returnValue = rawDispatch(action);
        console.log("%c next state", "color: green", store.getState());
        console.groupEnd(action.type);

        return returnValue;
    };
};

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    store.dispatch = addLoggingToDispatch(store);
    return store;
}