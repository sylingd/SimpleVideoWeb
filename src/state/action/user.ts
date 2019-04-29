import { Dispatch } from 'redux';

import * as actions from './types';
import ajax from '../../ajax';
import * as LoginApi from '../../api/user/login';

import { IUser } from '../../types';

export function setUser(user: IUser | null) {
	return {
		type: actions.SET_USER,
		user
	}
}

export function logout() {
	return (dispatch: Dispatch) => {
		sessionStorage.removeItem("token");
		dispatch(setUser(null));
	}
}

export function login(user: string, password: string) {
	return async (dispatch: Dispatch) => {
		const res = await ajax({
			url: LoginApi.URL,
			post: { user, password }
		});
		if (res.success) {
			const data = (res.data as LoginApi.IResponse);
			sessionStorage.setItem("token", data.token);
			dispatch(setUser(data.user));
		}
	}
}