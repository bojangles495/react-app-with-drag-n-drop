import { genericDispatch } from '../dispatch-utils';
import * as actions from './actions';

export function setToggle(dispatch, showFlag) {
	genericDispatch(dispatch, actions.SET_EDIT_TOGGLE, showFlag);
}

export function addItemToList(dispatch, newItem, insertBeforeId) {
	genericDispatch(dispatch, actions.ADD_ITEM_PLANK, {
        newItem,
        insertBeforeId
    });
}

export function cloneItem(dispatch, clonedItem) {
	genericDispatch(dispatch, actions.CLONE_ITEM_PLANK, {
        clonedItem
    });
}

export function editItem(dispatch, editedItem) {
    genericDispatch(dispatch, actions.EDIT_ITEM_PLANK, {
        editedItem
    });
}

export function hideEditPane(dispatch) {
    genericDispatch(dispatch, actions.HIDE_EDIT_PANE, {});
}

export function moveItem(dispatch, id, insertBeforeId) {
    genericDispatch(dispatch, actions.MOVE_ITEM_PLANK, {
        id,
        insertBeforeId
    });
}

export function removeItem(dispatch, removedItem) {
	genericDispatch(dispatch, actions.REMOVE_ITEM_PLANK, {
        removedItem
    });
}

export function updateItem(dispatch, itemUpdate) {
    genericDispatch(dispatch, actions.UPDATE_ITEM_DATA, {
        itemUpdate
    });
}

export function initializeHome(dispatch) {
 	setToggle(dispatch, false);
 	genericDispatch(dispatch, actions.INITIALIZE_ITEM_PLANKS);
}
