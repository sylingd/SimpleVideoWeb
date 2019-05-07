import { handleActions } from 'redux-actions';
import { IUser } from 'src/types';
import * as actions from 'src/state/action/types';

interface IModel {
	is: boolean;
	user: IUser | null;
}

// 初始的状态
const initialState: IModel = {
	is: false,
	user: null
};

const Reducer = handleActions<IModel>({
	[actions.SET_USER]: (state: any, action: any) => {
		return {
			is: action.user != null,
			user: action.user
		};
	},
}, initialState)

export default Reducer;