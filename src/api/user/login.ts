import { IUser } from 'src/types';

export const URL = "user/login";

export interface IRequest {
	name: string;
	password: string;
}

export interface IResponse {
	token: string;
	user: IUser;
}