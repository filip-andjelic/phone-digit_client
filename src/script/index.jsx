import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import Actions from './core/action_creators';
import {Core} from './core/core';
import App from './App';
import {ConverterPageWrapper} from './pages/ConverterPage';
import '../style/sass/application.scss';

const routes = <Route component={App}>
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

Core.socket.on('WORD_LIST', (wordList) => {
    Core.store.dispatch(Actions.wordList(Core.store.getState(), wordList));
});

Core.socket.on('HISTORY_LIST', (input) => {
    Core.store.dispatch(Actions.historyList(Core.store.getState(), input));
});

connectionStateList.forEach(ev =>
    Core.socket.on(ev, () => Core.store.dispatch(Actions.setConnectionState(ev, Core.socket.connected)))
);

ReactDOM.render(
    <Provider store={Core.store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
