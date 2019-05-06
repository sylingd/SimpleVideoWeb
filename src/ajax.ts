interface IAjaxParam {
	post?: object;
	header?: object;
	url: string;
	query?: string;
}

interface IFetchParam {
	method: string;
	headers: string[][] | Record<string, string> | Headers;
	body?: string | FormData;
}

interface IFetchResult {
	success: boolean;
	error?: string;
	errno?: number;
	data?: any;
}

export default async function(param: IAjaxParam) {
	const fetchParam: IFetchParam = {
		method: param.post ? 'POST' : 'GET',
		headers: {}
	};
	let url = `/api/${param.url}`;
	if (param.query) {
		url += '?' + (new URLSearchParams(param.query)).toString();
	}
	if (param.post) {
		// 遍历一下，查找是否有File
		let hasFile = false;
		for (const name of Object.keys(param.post)) {
			if (param.post[name] instanceof File) {
				hasFile = true;
				break;
			}
		}
		console.log(hasFile);
		if (hasFile) {
			const formBody = new FormData();
			for (const name of Object.keys(param.post)) {
				if (param.post[name] instanceof File) {
					formBody.append(name, param.post[name], param.post[name].name);
				} else {
					formBody.append(name, param.post[name]);
				}
			}
			fetchParam.body = formBody;
		} else {
			fetchParam.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			const body = [];
			for (const name of Object.keys(param.post)) {
				body.push(encodeURIComponent(name) + "=" + encodeURIComponent(param.post[name]));
			}
			fetchParam.body = body.join('&');
		}
	}
	if (param.header) {
		for (const name of Object.keys(param.header)) {
			fetchParam.headers[name] = param.header[name];
		}
	}
	const result = await fetch(url, fetchParam);
	const res = await result.json();
	return res as IFetchResult;
}