import * as actions from './actions';
import * as routes from './routes';
import { fromJS, Map } from 'immutable';

const initialState = Map({
    spinner: false,
    route: routes.HOME
});

export default function reducers(state = initialState, action) {
    if (action && action.type) {
        switch (action.type) {
            case actions.INITIALIZE_ROUTER:
                return fromJS(action.data);
            case actions.SET_ROUTE:
                return state.set('route', action.data.route).set('extraProps', action.data.extraProps);
            case actions.SHOW_LOADING:
                return state.set('spinner', true);
            case actions.HIDE_LOADING:
                return state.set('spinner', false);
            default:
                return state;
        }
    }
    return state;
}
