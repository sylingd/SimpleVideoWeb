export interface IVideo {
	id: number;
	category: number;
	user: number;
	name: string;
	image: string;
	aid: number;
	create_time: string;
}

export interface IUser {
	id: number;
	is_admin: number;
	name: string;
	avatar: string;
	nickname: string;
	email: string;
}

export interface IComment {
	id: number;
	user: IUser;
	create_time: string;
	zan: number;
	body: string;
}

export interface ICategory {
	id: number;
	name: string;
}