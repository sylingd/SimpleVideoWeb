import { handleActions } from 'redux-actions';
import { IModel } from '../model';
import * as actions from '../action/types';

// 初始的状态
const initialState: IModel = {
	user: null
};

const Reducer = handleActions<IModel>({
	[actions.SET_USER]: (state: any, action: any) => {
		return {
			user: action.user
		};
	},
}, initialState)

export default Reducer;