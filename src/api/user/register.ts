import ajax from 'src/ajax';

const URL = "user/register";

interface IRequest {
	name: string;
	email: string;
	password: string;
	nickname: string;
	avatar: string;
}

interface IResponse {
	id: number;
}

export default async function(req: IRequest) {
	const res = await ajax({
		url: URL,
		post: req
	});
	if (res.success) {
		const data = (res.data as IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}