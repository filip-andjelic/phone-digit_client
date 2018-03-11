import {List, Map} from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import remoteActionMiddleware from './remote_action_middleware';
import io from 'socket.io-client';
import reducer from './reducer';

function setConnectionState(state, connectionState, connected) {
    return state.set('connection', Map({
        state: connectionState,
        connected
    }));
}

function setState(state, newState) {
    return state.merge(newState);
}

function wordChange(state, wordList) {
    return state.set('wordsList', wordList);
}

function updateHistory() {
    if (socket) {
        console.log('IDEE NA SERVER');
        return socket.emit('TOGGLE_HISTORY_LIST');
    }
}

function toggleRealWords() {
    const state = store.getState();
    const realWords = !state.get('realWords');

    if (socket) {
        socket.emit('TOGGLE_REAL_WORDS', realWords);
    }

    return state.set('realWords', realWords);
}

function editInput(input) {
    let validationMessage = '';
    const digitCheckRegEx = /^[0-9]+$/;
    const state = store.getState();
    const realWords = state.get('realWords');

    if (input) {
        if (typeof input !== 'string') {
            validationMessage = 'Input type is not valid. Only strings allowed!';
        } else if (!digitCheckRegEx.test(input)) {
            validationMessage = 'Your input is not valid. Only digits allowed!';
        }
    }
    if (validationMessage) {
        // @TODO throw an exception instead
        return validationMessage;
    }
    if (socket) {
        socket.emit('INPUT_CHANGE', input, realWords);
    }

    return state.set('inputValue', input);
}

const INITIAL_STATE = new Map({
    'inputValue': '',
    'historyList': new List(),
    'wordsList': new List(),
    'realWords': false
});

const socket = io(`${location.protocol}//${location.hostname}:7171`);

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

export const Core = {
    setConnectionState: setConnectionState,
    setState: setState,
    editInput: editInput,
    wordChange: wordChange,
    updateHistory: updateHistory,
    toggleRealWords: toggleRealWords,
    INITIAL_STATE: INITIAL_STATE,
    socket: socket,
    store: store
};