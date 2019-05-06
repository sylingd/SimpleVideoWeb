import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { IUser } from '../../types';
import { login } from '../../state/action/user';
import { Form, Input, Button, Icon, message } from 'antd';
import FormInput from '../../component/FormInput';

interface IAppProps {
	history: History,
	login: any
}

interface IAppState {
	name: string;
	password: string;
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: '',
			password: ''
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
		const hide = message.loading('登录中', 0)
		this.props.login(this.state.name, this.state.password)
		.then((user: IUser) => {
			hide();
			message.success('欢迎回来，' + user.nickname);
			this.props.history.push('/');
		})
		.catch((err: Error) => {
			hide();
			message.error(err.message);
		})
	}

	public render() {
		return (
			<div className="Login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormInput name="name" icon="user" placeholder="UserName" onChange={this.onChange} />
					<Form.Item>
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" placeholder="Password" onChange={this.onChange} />
					</Form.Item>
					<Button type="primary" htmlType="submit">登录</Button>
					<Button type="default"><Link to="/user/register">注册</Link></Button>
				</Form>
			</div>
		);
	}
}

export default connect(null, { login })(App);