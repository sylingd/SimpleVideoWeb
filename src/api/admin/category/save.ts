import { ICategory } from 'src/types';
import ajax from 'src/ajax';

const URL = "admin/category";

export default async function(req: ICategory) {
	const res = await ajax({
		url: URL,
		post: {
			id: req.id,
			name: req.name
		}
	});
	if (res.success) {
		return res;
	} else {
		return new Error(res.error);
	}
}