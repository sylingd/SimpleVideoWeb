import * as React from 'react';
import { Link } from 'react-router-dom';
import { Register } from 'src/api/user';
import { History } from 'history';
import { Form, Input, Button, Icon, message } from 'antd';
import FormInput from 'src/component/FormInput';

interface IAppProps {
	history: History
}

interface IAppState {
	name: string;
	email: string;
	password: string;
	nickname: string;
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			nickname: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	public onChange(e: React.ChangeEvent<HTMLInputElement>) {
		const toSet = {};
		toSet[e.target.name] = e.target.value;
		this.setState(toSet);
	}

	public handleSubmit(e: React.FormEvent<any>) {
		e.preventDefault();
		const hide = message.loading('注册中', 0)
		Register(this.state)
		.then(() => {
			hide();
			message.success('注册成功');
			this.props.history.push('/user/login');
		})
		.catch((err: Error) => {
			hide();
			message.error(err.message);
		})
	}

	public render() {
		return (
			<div className="Register">
				<Form onSubmit={this.handleSubmit} className="register-form">
					<FormInput name="name" icon="user" placeholder="UserName" onChange={this.onChange} />
					<FormInput name="email" icon="mail" placeholder="EMail" onChange={this.onChange} />
					<FormInput name="nickname" icon="user" placeholder="NickName" onChange={this.onChange} />
					<Form.Item>
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" placeholder="Password" onChange={this.onChange} />
					</Form.Item>
					<Button type="primary" htmlType="submit">注册</Button>
					<Button type="default" ><Link to="/user/login">登录</Link></Button>
				</Form>
			</div>
		);
	}
}

export default App;