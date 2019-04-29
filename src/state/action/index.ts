import { createAction } from 'redux-actions';

import { IModel } from '../model';
import { IUser } from '../../types';

const setUser = createAction<IModel, IUser | null>(
	'SET_USER',
	(user: IUser | null) => ({
		user
	})
);

export {
	setUser
} 