import * as React from 'react';
import { Modal, Button, Table, message } from 'antd';
import { IVideo } from 'src/types';
import { All as VideoList } from 'src/api/video';
import * as VideoApi from 'src/api/admin/video';
import { PaginationConfig } from 'antd/lib/table';
import FormInput from 'src/component/FormInput';

interface IAppState {
	pagination: PaginationConfig;
	loading: boolean;
	video: IVideo[];
	edit: IVideo | null;
	editShow: boolean;
	editLoading: boolean;
}

class App extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			pagination: {},
			video: [],
			edit: null,
			editShow: false,
			editLoading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);
	}
	public async load() {
		this.setState({
			loading: true
		});
		const res = await VideoList({
			page: this.state.pagination.current || 1
		});
		this.setState({
			loading: false
		});
		if (!(res instanceof Error)) {
			const pagination = { ...this.state.pagination };
			pagination.pageSize = res.size;
			pagination.total = Math.ceil(res.total / res.size);
			this.setState({
				pagination,
				video: res.list
			});
		}

	}
	public async componentDidMount() {
		await this.load();
	}
	public async handleChange(page: PaginationConfig) {
		const pagination = { ...this.state.pagination };
		pagination.current = page.current;
		this.setState({ pagination });
		await this.load();
	}

	public handleEditOpen(it: IVideo) {
		this.setState({
			editShow: true,
			editLoading: false,
			edit: it
		});
	}
	public async handleEdit() {
		if (this.state.edit === null) {
			return;
		}
		this.setState({
			editLoading: true
		});
		const res = await VideoApi.Save(this.state.edit);
		this.setState({
			editShow: false,
			editLoading: false
		});
		if (!(res instanceof Error)) {
			message.success('修改成功');
			await this.load();
		}
	}
	public handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
		const edit = Object.assign({}, this.state.edit);
		edit[e.target.name] = e.target.value;
		this.setState({ edit });
	}

	public async handleDelete(it: IVideo) {
		await VideoApi.Del({
			id: it.id
		});
		await this.load();
	}

	public render() {
		const columns = [{
			title: "#",
			dataIndex: 'id',
			key: 'id',
			width: 80,
			render: (text: string) => text
		}, {
			title: "图片",
			dataIndex: 'image',
			key: 'image',
			width: 80,
			render: (text: string) => {
				return (<img src={text} style={{
					maxHeight: "100px", maxWidth: "100px"
				}} />)
			}
		}, {
			title: "名称",
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => text
		}, {
			title: "提交事件",
			dataIndex: 'create_time',
			key: 'create_time',
			render: (text: string) => text
		}, {
			title: "操作",
			key: 'action',
			width: 170,
			render: (_: string, record: IVideo) => {
				return (
					<Button.Group>
						<Button onClick={() => this.handleEditOpen(record)}>编辑</Button>
						<Button onClick={() => this.handleDelete(record)}>删除</Button>
					</Button.Group>
				)
			}
		}];
		const editContent = this.state.edit === null ? (<div />) : (
			<div>
				<FormInput name="image" icon="user" placeholder="image" onChange={this.handleEditChange} value={this.state.edit.image} />
				<FormInput name="name" icon="user" placeholder="Name" onChange={this.handleEditChange} value={this.state.edit.name} />
				<FormInput name="create_time" icon="user" placeholder="Create time" onChange={this.handleEditChange} value={this.state.edit.create_time} />
			</div>
		);
		return (
			<div>
				<Table columns={columns} dataSource={this.state.video} loading={this.state.loading} onChange={this.handleChange} pagination={this.state.pagination} rowKey="id" />
				<Modal title="编辑"
					visible={this.state.editShow}
					onOk={this.handleEdit}
					onCancel={() => this.setState({ editShow: false })}
					confirmLoading={this.state.editLoading}>
					{editContent}
				</Modal>
			</div>
		);
	}
}

export default App;