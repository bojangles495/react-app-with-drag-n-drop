import immutable from 'immutable';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';
import Component from './component';
import namespace from './namespace';
import * as routes from './routes';

function mapStateToProps(state, ownProps) {
    const normalizedState = state.get(namespace, immutable.Map()).toJS();

    return {
        extraProps: normalizedState.extraProps,
        routes,
        route: normalizedState.route,
        spinner: normalizedState.spinner,
        ...ownProps
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        showLoadingScreen: actionCreators.showLoadingScreen.bind(null, dispatch),
        hideLoadingScreen: actionCreators.hideLoadingScreen.bind(null, dispatch),
        setRoute: actionCreators.setRoute.bind(null, dispatch)
    };
}

export default function(component = Component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
