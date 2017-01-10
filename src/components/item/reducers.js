//import { fromJS, Map } from 'immutable';
import { Map } from 'immutable';
//import * as actions from './actions';

export default function reducers(state = Map(), action) {
    if (action && action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
