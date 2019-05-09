import { IVideo } from 'src/types';
import ajax from 'src/ajax';

const URL = "video/all";

interface IRequest {
	page?: number;
}

interface IResponse {
	list: IVideo[];
}

export default async function(req: IRequest) {
	const res = await ajax({
		url: URL,
		query: {
			page: (req.page || 1).toString()
		}
	});
	if (res.success) {
		const data = (res.data as IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}