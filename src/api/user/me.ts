import { IUser } from 'src/types';

export const URL = "user/me";

export interface IResponse {
	user: IUser;
}