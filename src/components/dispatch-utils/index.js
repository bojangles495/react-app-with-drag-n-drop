export const GLOBAL_ERROR = 'GLOBAL_ERROR';

export function genericDispatchWithStatus(dispatch, actionType, status, data = {}) {
    dispatch({
        type: actionType,
        status,
        data
    });
}

export function genericDispatch(dispatch, actionType, data = {}) {
    dispatch({
        type: actionType,
        data
    });
}

export function globalError(error) {
    return {
        type: GLOBAL_ERROR,
        error
    };
}

export function errorDispatch(dispatch, error) {
    dispatch(globalError(error));
}
