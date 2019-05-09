import ajax from 'src/ajax';

const URL = "admin/user/del";

interface IRequest {
	id: number;
}

export default async function(req: IRequest) {
	const res = await ajax({
		url: URL,
		query: {
			id: req.id.toString()
		}
	});
	if (res.success) {
		return res.data;
	} else {
		return new Error(res.error);
	}
}
