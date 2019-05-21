import { IVideo } from 'src/types';
import ajax from 'src/ajax';

const URL = "video";

interface IResponse {
	id: number;
}

export default async function(req: IVideo) {
	const res = await ajax({
		url: URL,
		post: {
			name: req.name,
			image: req.image,
			aid: req.aid,
			category: req.category
		}
	});
	if (res.success) {
		const data = (res.data as IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}