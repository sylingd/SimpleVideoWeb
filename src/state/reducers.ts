import { handleActions } from 'redux-actions';
import { IModel } from './model';

// 初始的状态
const initialState: IModel = {
	user: null
};

export const Reducer = handleActions<IModel>({
	['SET_USER']: (state: any, action: any) => {
		console.log('reducer->state:', state);
		console.log('reducer->action:', action);
		return {
			user: null
		};
	},
}, initialState);