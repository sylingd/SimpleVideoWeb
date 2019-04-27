export interface IVideo {
	id: number;
	category: number;
	user: number;
	title: string;
	image: string;
	aid: number;
	create_time: string;
}

export interface IUser {
	id: number;
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