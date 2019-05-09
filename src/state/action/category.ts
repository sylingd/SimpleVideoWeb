import { Dispatch } from 'redux';

import * as actions from './types';
import * as CatApi from 'src/api/category';

import { ICategory } from 'src/types';

export function setCategory(category: ICategory[]) {
	return {
		type: actions.SET_CATEGORY,
		category
	}
}

export function refresh() {
	return async (dispatch: Dispatch) => {
		const res = await CatApi.List();
		if (!(res instanceof Error)) {
			dispatch(setCategory(res.list));
		}
	}
}