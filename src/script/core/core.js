import {List, Map} from 'immutable';
import {createStore} from 'redux';
import io from 'socket.io-client';
import reducer from './reducer';

// Merges new state into an old one
function setState(state, newState) {
    return state.merge(newState);
}

// Updates wordList property of the state
function wordChange(state, wordList) {
    return state.set('wordsList', wordList);
}

// API call to update history list
// As consequence listener updates words' list
// To display history list items
function updateHistory() {
    if (socket) {
        socket.emit('TOGGLE_HISTORY_LIST');
    }

    return store.getState();
}

// Updates historyList property of the state
function history(state, history) {
    return state.set('historyList', new List(history));
}

// API call to update words' list on behalf of words filter
// As consequence listener updates words' list
// And realWords property of the state is updated
function toggleRealWords() {
    const state = store.getState();
    const realWords = !state.get('realWords');

    if (socket) {
        socket.emit('TOGGLE_REAL_WORDS', realWords);
    }

    return state.set('realWords', realWords);
}

/*
 *  API call to update words' list based on input value
 *  Updates inputValue property of the state
 *
 *  @param input {String}
 *  @return callback
 */
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
        // Display a message to the user
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
const store = createStore(reducer);

export const Core = {
    setState: setState,
    editInput: editInput,
    wordChange: wordChange,
    updateHistory: updateHistory,
    toggleRealWords: toggleRealWords,
    history: history,
    INITIAL_STATE: INITIAL_STATE,
    socket: socket,
    store: store
};