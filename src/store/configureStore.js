import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../root-reducers';
import DevTools from '../components/DevTools';
import { Map } from 'immutable';


function stateTransformer(state) {
    return state.toJS();
}

const middlewares = [];
const logger = createLogger({
        duration: true,
        timestamp: true,
        stateTransformer
    });

middlewares.push(logger);

const composed = [applyMiddleware(...middlewares)];

composed.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());

const enhancer = compose(...composed);
const configureStore = createStore(
    rootReducer,
    Map(),
    enhancer
  );
export default configureStore
