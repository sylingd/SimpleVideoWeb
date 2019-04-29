import * as React from 'react';
import { connect } from 'react-redux';
import { login } from '../../state/action/user';
import { Form, Input, Button, Icon, message } from 'antd'

interface IAppProps {
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
		switch (e.target.name) {
			case 'name':
				this.setState({
					name: e.target.value
				});
				break;
			case 'password':
				this.setState({
					password: e.target.value
				});
				break;
		}
	}

	public handleSubmit(e: React.FormEvent<any>) {
		e.preventDefault();
		const hide = message.loading('登录中', 0)
		this.props.login(this.state.name, this.state.password).then(
			() => hide(),
			(err: any) => console.log(err)
		)
	}

	public render() {
		return (
			<div className="Login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						<Input name="name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.onChange} />
					</Form.Item>
					<Form.Item>
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" placeholder="Password" onChange={this.onChange} />
					</Form.Item>
					<Button type="primary" htmlType="submit">登录</Button>
				</Form>
			</div>
		);
	}
}

export default connect(null, { login })(App);