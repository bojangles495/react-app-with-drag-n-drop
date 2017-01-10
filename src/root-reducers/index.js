import { combineReducers } from 'redux-immutable';
import edit from '../components/edit';
import emailItemCard from '../components/email-item-card';
import emailTemplate from '../components/email-template';
import home from '../components/home';
import item from '../components/item';	
import router from '../components/router';


const rootReducer = combineReducers({
	...edit.combinedReducers,
	...emailItemCard.combinedReducers,
	...emailTemplate.combinedReducers,
	...item.combinedReducers,
  	...home.combinedReducers,
  	...router.combinedReducers
});

export default rootReducer
