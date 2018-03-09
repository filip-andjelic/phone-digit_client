import objectAssign from 'object-assign';

export default socket => store => dispatch => action => {
    if (action.meta && action.meta.remote) {
        socket.emit(action.type, objectAssign({}, action));
    }

    return dispatch(action);
}
