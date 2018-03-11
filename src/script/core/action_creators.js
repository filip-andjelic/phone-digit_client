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

function editInput(input, callback) {
    return {
        type: 'INPUT_CHANGE',
        input,
        callback
    };
}

function historyList() {
    return {
        type: 'HISTORY_LIST'
    };
}

function realWords() {
    return {
        type: 'REAL_WORDS'
    };
}

export default {
    setConnectionState: setConnectionState,
    setState: setState,
    wordList: wordList,
    editInput: editInput,
    historyList: historyList,
    realWords: realWords
};