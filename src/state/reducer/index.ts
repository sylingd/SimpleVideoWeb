import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import user from './user';
import category from './category';

export default (history: History<any>) => combineReducers({
	user,
	category,
	router: connectRouter(history)
})