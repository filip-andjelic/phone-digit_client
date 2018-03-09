import {List, Map} from 'immutable';

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
    return state.set('wordList', wordList);
}

function editInput(state, input) {
    let validationMessage = '';
    const digitCheckRegEx = /^[0-9]+$/;

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

    return state.set('inputValue', input);
}

const INITIAL_STATE = new Map({
    'inputValue': '',
    'historyList': new List(),
    'wordsList': new List(),
    'realWords': false
});

export default {
    setConnectionState: setConnectionState,
    setState: setState,
    editInput: editInput,
    wordChange: wordChange,
    INITIAL_STATE: INITIAL_STATE
};