import ajax from 'src/ajax';
import * as ListApi from './list';
import * as SaveApi from './save';

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

export async function Save(req: SaveApi.IRequest) {
	const res = await ajax({
		url: SaveApi.URL,
		post: Object.assign({}, req)
	});
	if (res.success) {
		const data = (res.data as SaveApi.IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}

export { default as Del } from './del';