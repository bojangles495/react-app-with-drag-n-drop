import * as actions from './actions';

function genericDispatch(dispatch, type, data = {}) {
    dispatch({ type, data });
}

export function initializeRouter(dispatch, data) {
    genericDispatch(dispatch, actions.INITIALIZE_ROUTER, data);
}

export function setRoute(dispatch, route, extraComponentProps) {
    const extraProps = extraComponentProps || {};

    genericDispatch(dispatch, actions.SET_ROUTE, { route, extraProps });
}

export function showLoadingScreen(dispatch) {
    genericDispatch(dispatch, actions.SHOW_LOADING);
}

export function hideLoadingScreen(dispatch) {
    genericDispatch(dispatch, actions.HIDE_LOADING);
}
