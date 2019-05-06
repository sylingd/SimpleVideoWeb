import ajax from '../../ajax';
import * as ImageApi from './image';

export async function Image(req: ImageApi.IRequest) {
	const res = await ajax({
		url: ImageApi.URL,
		post: {
			file: req.file
		}
	});
	if (res.success) {
		const data = (res.data as ImageApi.IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}
