import { IVideo } from 'src/types';
import ajax from 'src/ajax';

const URL = "video/list/";

interface IRequest {
	id: string;
	page?: number;
}

interface IResponse {
	list: IVideo[];
}

export default async function(req: IRequest) {
	const res = await ajax({
		url: URL + req.id,
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