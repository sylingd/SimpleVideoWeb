import ajax from 'src/ajax';
import * as ListApi from './list';

export async function List(req: ListApi.IRequest) {
	const res = await ajax({
		url: ListApi.URL,
		query: {
			page: req.page.toString()
		}
	});
	if (res.success) {
		const data = (res.data as ListApi.IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}
