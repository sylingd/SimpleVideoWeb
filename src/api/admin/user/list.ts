import { IUser } from 'src/types';

export const URL = "admin/user/list";

export interface IRequest {
	page: number;
}

export interface IResponse {
	total: number;
	size: number;
	list: IUser[];
}