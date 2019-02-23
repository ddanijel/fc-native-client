import React from 'react';
import InitApp from './InitApp';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <InitApp/>
    </Provider>
);

export default App;