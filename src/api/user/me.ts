import { IUser } from 'src/types';
import ajax from 'src/ajax';

const URL = "user/me";

interface IResponse {
	user: IUser;
}

export default async function() {
	const res = await ajax({
		url: URL
	});
	if (res.success) {
		const data = (res.data as IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}