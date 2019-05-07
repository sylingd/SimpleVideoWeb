import { IUser } from 'src/types';

export const URL = "admin/user/list";

export interface IRequest {
	page: number;
}

export interface IResponse {
	list: IUser[];
}