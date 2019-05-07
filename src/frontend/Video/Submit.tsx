import * as React from 'react';
import { Form, Button } from 'antd';
import Upload from 'src/component/Upload';
import FormInput from 'src/component/FormInput';

interface IAppState {
	name: string;
	image: string;
}

class App extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: "",
			image: ""
		}
	}

	public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const toSet = {};
		toSet[e.target.name] = e.target.value;
		this.setState(toSet);
	}

	public handleUpload(url: string) {
		this.setState({
			image: url
		});
	}

	public handleSubmit(e: React.FormEvent<any>) {
		e.preventDefault();
	}
	public render() {
		return (
			<div className="video-submit">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						<Upload onUpload={this.handleUpload} height={150} width={200} />
					</Form.Item>
					<FormInput name="name" icon="user" placeholder="名称" onChange={this.handleChange} />
					<Button type="primary" htmlType="submit">提交</Button>
				</Form>
			</div>
		)
	}
}

export default App;