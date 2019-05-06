import { IUser } from '../../types';

export const URL = "user/me";

export interface IResponse {
	user: IUser;
}