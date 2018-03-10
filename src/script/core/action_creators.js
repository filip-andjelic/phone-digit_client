function setConnectionState(state, connected) {
    return {
        type: 'SET_CONNECTION_STATE',
        state,
        connected
    };
}

function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

function wordList(state, wordList) {
    return {
        type: 'WORD_LIST',
        wordList,
        state
    };
}

function editInput(input) {
    return {
        type: 'INPUT_CHANGE',
        input
    };
}
function historyList(state, input) {
    return {
        type: 'HISTORY_LIST',
        input,
        state
    };
}

export default {
    setConnectionState: setConnectionState,
    setState: setState,
    wordList: wordList,
    editInput: editInput,
    historyList: historyList
};