import * as actionCreators from './action-creators';
import component from './component';
import container from './container';
import reducers from './reducers';
import namespace from './namespace';

export default {
    actionCreators,
    combinedReducers: { [namespace]: reducers },
    component,
    container: container()
};