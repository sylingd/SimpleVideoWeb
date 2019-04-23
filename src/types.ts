interface IVideo {
	id: number;
	title: string;
	image: string;
	aid: number;
	cid: number;
}

interface IUser {
	id: number;
	name: string;
	avatar: string;
}

interface IComment {
	id: number;
	user: IUser;
	time: number;
	zan: number;
	content: string;
}

export { IVideo, IUser, IComment }