import {Map} from 'immutable';
import Core from './core';

export default function(state = Core.INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CONNECTION_STATE':
            return Core.setConnectionState(state, action.state, action.connected);
        case 'SET_STATE':
            return Core.setState(state, action.state);
        case 'INPUT_CHANGE':
            return Core.editInput(action.state, action.input);
        case 'WORD_LIST':
            return Core.wordChange(action.state, action.wordList);
        default:
            return state;
    }
}
