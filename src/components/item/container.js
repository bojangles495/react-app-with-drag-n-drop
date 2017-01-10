import { Map } from 'immutable';
import { connect } from 'react-redux';
import Component from './component';
import namespace from './namespace';

function mapStateToProps(state) {
    const normalizedState = state.get(namespace, Map()).toJS();

    return normalizedState;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default function(component = Component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
