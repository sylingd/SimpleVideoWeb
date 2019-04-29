import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import user from './user';

export default (history: History<any>) => combineReducers({
	user,
	router: connectRouter(history)
})