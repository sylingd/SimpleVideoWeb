import * as React from 'react';
import { Form, Button, Select } from 'antd';
import * as VideoApi from 'src/api/video';
import Upload from 'src/component/Upload';
import FormInput from 'src/component/FormInput';
import { IVideo, ICategory } from 'src/types';
import { connect } from 'react-redux';

interface IAppProps {
	category: ICategory[];
}

interface IAppState {
	video: IVideo
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			video: {
				id: -1,
				category: 0,
				name: "",
				user: -1,
				create_time: "",
				aid: 0,
				image: ""
			}
		}
		this.handleUpload = this.handleUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	}

	public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const it = Object.assign({}, this.state.video);
		if (typeof (it[e.target.name]) !== "undefined") {
			it[e.target.name] = e.target.value;
			this.setState({
				video: it
			});
		}
	}
	public handleCategoryChange(e: string) {
		const it = Object.assign({}, this.state.video);
		it.category = parseInt(e, 10);
		this.setState({
			video: it
		});
	}

	public handleUpload(url: string) {
		const it = Object.assign({}, this.state.video);
		it.image = url;
		this.setState({
			video: it
		});
	}

	public async handleSubmit(e: React.FormEvent<any>) {
		e.preventDefault();
		const res = await VideoApi.Submit(this.state.video);
		console.log(res);
	}


	public render() {
		const catOpts = this.props.category.map(it => {
			return (<Select.Option key={it.id} value={it.id.toString()}>{it.name}</Select.Option>);
		});
		return (
			<div className="video-submit">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						<Upload onUpload={this.handleUpload} height={150} width={200} />
					</Form.Item>
					<FormInput name="name" icon="user" placeholder="名称" onChange={this.handleChange} />
					<Select onChange={this.handleCategoryChange}>
						{catOpts}
					</Select>
					<FormInput name="aid" icon="user" placeholder="AID" onChange={this.handleChange} />
					<Button type="primary" htmlType="submit">提交</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	category: state.category.list
});

export default connect(mapStateToProps, {})(App);