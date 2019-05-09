import { handleActions } from 'redux-actions';
import { ICategory } from 'src/types';
import * as actions from 'src/state/action/types';

interface IModel {
	list: ICategory[];
}

// 初始的状态
const initialState: IModel = {
	list: []
};

const Reducer = handleActions<IModel>({
	[actions.SET_CATEGORY]: (state: any, action: any) => {
		return {
			list: action.category
		};
	},
}, initialState)

export default Reducer;