import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './core/reducer';
import Actions from './core/action_creators';
import remoteActionMiddleware from './core/remote_action_middleware';
import App from './App';
import {ConverterPageWrapper} from './pages/ConverterPage';
require('../style.css');

const socket = io(`${location.protocol}//${location.hostname}:7171`);
const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
const routes =
    <Route component={App}>
        <Route path="/" component={ConverterPageWrapper}/>
    </Route>;
const connectionStateList = [
    'connect',
    'connect_error',
    'connect_timeout',
    'reconnect',
    'reconnecting',
    'reconnect_error',
    'reconnect_failed'
];

socket.on('STATE_CHANGE', state =>
    store.dispatch(Actions.setState(state))
);
socket.on('WORD_LIST', (wordList) => {
    store.dispatch(Actions.wordList(store.getState(), wordList));
});

connectionStateList.forEach(ev =>
    socket.on(ev, () => store.dispatch(Actions.setConnectionState(ev, socket.connected)))
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
