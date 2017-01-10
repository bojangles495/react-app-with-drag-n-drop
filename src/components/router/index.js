import * as actionCreators from './action-creators';
import component from './component';
import container from './container';
import namespace from './namespace';
import reducers from './reducers';
import * as routes from './routes';

export default {
    component,
    container: container(),
    actionCreators,
    combinedReducers: { [namespace]: reducers },
    routes
};
