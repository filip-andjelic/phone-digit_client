import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {Core} from './core/core';
import App from './App';
import {ConverterPageWrapper} from './pages/ConverterPage';
import '../style/sass/application.scss';

const routes = <Route component={App}>
        <Route path="/" component={ConverterPageWrapper}/>
    </Route>;

ReactDOM.render(
    <Provider store={Core.store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('application-wrapper')
);
