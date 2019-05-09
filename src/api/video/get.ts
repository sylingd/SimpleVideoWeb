import { IVideo } from 'src/types';
import ajax from 'src/ajax';

const URL = "video/get";

interface IRequest {
	id: number;
}

interface IResponse {
	video: IVideo;
}

export default async function(req: IRequest) {
	const res = await ajax({
		url: URL,
		query: {
			id: req.id.toString()
		}
	});
	if (res.success) {
		const data = (res.data as IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}