import { handleActions, Action } from 'redux-actions';
import { IModel } from '../model';
import * as actions from '../action/types';

// 初始的状态
const initialState: IModel = {
	user: null
};

const Reducer = handleActions<IModel>({
	[actions.SET_USER]: (state: any, action: Action<IModel>) => {
		console.log('reducer->state:', state);
		console.log('reducer->action:', action);
		return {
			user: action.payload.user
		};
	},
}, initialState)

export default Reducer;