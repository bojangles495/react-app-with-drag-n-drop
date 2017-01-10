import { fromJS, Map } from 'immutable';
import * as actions from './actions';
import _ from 'lodash';

function addItem(state, actionData) {
    const { newItem, insertBeforeId } = actionData;
    const { itemPlanksList, itemPlankCount } = state.toJS();
 
    newItem.itemId = `id${Math.floor((Math.random() * 100000) + 1)}`;
    if(newItem.type === "text"){
        newItem.text = "(Click Me)";
    }
    itemPlanksList.splice(insertBeforeId, 0, newItem);
 
    return state.set("itemPlanksList", fromJS(itemPlanksList))
                .set('itemPlankCount', itemPlankCount + 1);
}

function cloneItem(state, actionData) {
    const { clonedItem } = actionData;
    const { itemPlankCount, itemPlanksList } = state.toJS();
    const cloneIndex = _.findIndex(itemPlanksList, (item) => item.itemId === clonedItem.itemId);

    clonedItem.itemId = `id${Math.floor((Math.random() * 100000) + 1)}`;
    itemPlanksList.splice(cloneIndex+1, 0, clonedItem);

    return state.set("itemPlanksList", fromJS(itemPlanksList))
                .set('itemPlankCount', itemPlankCount + 1);
}

function editItem(state, actionData) {
    const { editedItem } = actionData;
    if(editedItem.type === "text") {
        return state.set("currentEditItem", fromJS(editedItem))
        .set('toggleEdit', true);
    } else {
        return state;
    }
}

function hideEditPane(state) {
    return state.set("currentEditItem", fromJS({}))
    .set('toggleEdit', false);
}

function moveItem(state, actionData) {
    const { id, insertBeforeId } = actionData;
    const { itemPlanksList } = state.toJS();
 
    itemPlanksList.splice(insertBeforeId, 0, itemPlanksList.splice(id, 1)[0]);
 
    return state.set("itemPlanksList", fromJS(itemPlanksList));
}

function removeItem(state, actionData) {
    const { removedItem } = actionData;
    const { itemPlankCount, itemPlanksList } = state.toJS();
    const removeIndex = _.findIndex(itemPlanksList, (item) => item.itemId === removedItem.itemId);
 
    if (removeIndex !== -1) {
        itemPlanksList.splice(removeIndex, 1);
    }
 
    return state.set("itemPlanksList", fromJS(itemPlanksList))
                .set('itemPlankCount', itemPlankCount - 1);
}

function updateItem(state, actionData) {
    const planksList = state.get("itemPlanksList").toJS();
    const currEditItem = state.get("currentEditItem").toJS();

    const updateIndex = _.findIndex(planksList, (item) => item.itemId === currEditItem.itemId); 

    if(actionData.itemUpdate === "") {
        currEditItem.text = "(Click Me)";
    } else {
        currEditItem.text = actionData.itemUpdate;
    }
    
    planksList[updateIndex] = currEditItem;   

    return state.set("itemPlanksList", fromJS(planksList))
    .set("currentEditItem", fromJS(currEditItem));
}

export default function reducers(state = Map(), action) {
    if (action && action.type) {
        switch (action.type) {
            case actions.INITIALIZE_ITEM_PLANKS:
                return state.set("itemPlanksList", fromJS(new Array()))
                .set("itemPlankCount", 0)
                .set("currentEditItem", fromJS({}));
            case actions.SET_EDIT_TOGGLE:
            	return state.set('toggleEdit', action.data);
            case actions.ADD_ITEM_PLANK:
                return addItem(state, action.data);
            case actions.CLONE_ITEM_PLANK:
                return cloneItem(state, action.data);
            case actions.EDIT_ITEM_PLANK:
                return editItem(state, action.data);
            case actions.HIDE_EDIT_PANE:
                return hideEditPane(state);
            case actions.MOVE_ITEM_PLANK:
                return moveItem(state, action.data);
            case actions.REMOVE_ITEM_PLANK:
                return removeItem(state, action.data);
            case actions.UPDATE_ITEM_DATA:
                return updateItem(state, action.data);
            default:
                return state;
        }
    }
    return state;
}
