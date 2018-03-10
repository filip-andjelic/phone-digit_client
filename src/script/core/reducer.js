import {Core} from './core';
import {List, Map} from 'immutable';

const INITIAL_STATE = new Map({
    'inputValue': '',
    'historyList': new List(),
    'wordsList': new List(),
    'realWords': false
});

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CONNECTION_STATE':
            return Core.setConnectionState(state, action.state, action.connected);
        case 'SET_STATE':
            return Core.setState(state, action.state);
        case 'INPUT_CHANGE':
            return Core.editInput(action.input);
        case 'WORD_LIST':
            return Core.wordChange(action.state, action.wordList);
        case 'HISTORY_LIST':
            return Core.updateHistory(action.state, action.wordList);
        default:
            return state;
    }
}
