import { Map } from 'immutable';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';
import Component from './component';
import namespace from './namespace';

function mapStateToProps(state) {
    const normalizedState = state.get(namespace, Map()).toJS();

    return normalizedState;
}

function mapDispatchToProps(dispatch) {
    return {
    	addItemToList: actionCreators.addItemToList.bind(null, dispatch),
    	cloneItem: actionCreators.cloneItem.bind(null, dispatch),
        editItem: actionCreators.editItem.bind(null, dispatch),
        hideEditPane: actionCreators.hideEditPane.bind(null, dispatch),
    	moveItem: actionCreators.moveItem.bind(null, dispatch),
    	removeItem: actionCreators.removeItem.bind(null, dispatch),
        updateItem: actionCreators.updateItem.bind(null, dispatch)
    };
}

export default function(component = Component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
