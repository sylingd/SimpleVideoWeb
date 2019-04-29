import * as React from 'react';
import { Link } from 'react-router-dom';
import { Register } from '../../api/user';
import { Form, Input, Button, Icon, message } from 'antd';
import { History } from 'history';

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
					<Form.Item>
						<Input name="name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.onChange} />
					</Form.Item>
					<Form.Item>
						<Input name="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="EMail" onChange={this.onChange} />
					</Form.Item>
					<Form.Item>
						<Input name="nickname" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nickname" onChange={this.onChange} />
					</Form.Item>
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