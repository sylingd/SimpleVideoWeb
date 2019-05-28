import { IVideo } from 'src/types';
import ajax from 'src/ajax';

const URL = "admin/video/save";

export default async function Save(req: IVideo) {
	const res = await ajax({
		url: URL,
		post: Object.assign({}, req)
	});
	if (res.success) {
		const data = res.data;
		return data;
	} else {
		return new Error(res.error);
	}
}