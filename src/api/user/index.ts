import ajax from 'src/ajax';
import * as LoginApi from './login';
import * as RegisterApi from './register';
import * as MeApi from './me';

export async function Login(req: LoginApi.IRequest) {
	const res = await ajax({
		url: LoginApi.URL,
		post: {
			name: req.name,
			password: req.password
		}
	});
	if (res.success) {
		const data = (res.data as LoginApi.IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}

export async function Register(req: RegisterApi.IRequest) {
	const res = await ajax({
		url: RegisterApi.URL,
		post: {
			name: req.name,
			email: req.email,
			password: req.password,
			nickname: req.nickname
		}
	});
	if (res.success) {
		const data = (res.data as RegisterApi.IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}

export async function Me() {
	const res = await ajax({
		url: MeApi.URL
	});
	if (res.success) {
		const data = (res.data as MeApi.IResponse);
		return data;
	} else {
		return new Error(res.error);
	}
}