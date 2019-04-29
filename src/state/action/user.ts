import { Dispatch } from 'redux';

import * as actions from './types';
import * as UserApi from '../../api/user';

import { IUser } from '../../types';

export function setUser(user: IUser | null) {
	return {
		type: actions.SET_USER,
		user
	}
}

export function refresh() {
	return async (dispatch: Dispatch) => {
		const res = await UserApi.Me();
		if (!(res instanceof Error)) {
			dispatch(setUser(res.user));
		}
	}
}

export function logout() {
	return (dispatch: Dispatch) => {
		sessionStorage.removeItem("token");
		dispatch(setUser(null));
	}
}

export function login(name: string, password: string) {
	return (dispatch: Dispatch) => {
		return new Promise((resolve, reject) => {
			UserApi.Login({ name, password }).then(res => {
				if (!(res instanceof Error)) {
					sessionStorage.setItem("token", res.token);
					dispatch(setUser(res.user));
					resolve(res.user);
				} else {
					reject(res);
				}
			})
		})
	}
}