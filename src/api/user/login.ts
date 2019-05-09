import { IUser } from 'src/types';
import ajax from 'src/ajax';

const URL = "user/login";

interface IRequest {
	name: string;
	password: string;
}

interface IResponse {
	token: string;
	user: IUser;
}

export default async function(req: IRequest) {
	const res = await ajax({
		url: URL,
		post: {
			name: req.name,
			password: req.password
		}
	});
	if (res.success) {
		const data = (res.data as IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}