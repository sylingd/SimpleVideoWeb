export const URL = "user/register";

export interface IRequest {
	name: string;
	email: string;
	password: string;
	nickname: string;
}

export interface IResponse {
	id: number;
}