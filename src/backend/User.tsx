import * as React from 'react';
import { Modal, Button, Table, Avatar } from 'antd';
import { IUser } from 'src/types';
import * as UserApi from 'src/api/admin/user';
import { PaginationConfig } from 'antd/lib/table';
import FormInput from 'src/component/FormInput';

interface IAppState {
	pagination: PaginationConfig;
	loading: boolean;
	user: IUser[];
	edit: IUser | null;
	editShow: boolean;
	editLoading: boolean;
}

class App extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			pagination: {},
			user: [],
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
		const res = await UserApi.List({
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
				user: res.list
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
	public handleEditOpen(it: IUser) {
		this.setState({
			editShow: true,
			editLoading: false,
			edit: it
		});
	}
	public async handleEdit() {
		this.setState({
			editLoading: true
		});
	}
	public handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
		const user = {...this.state.user};
		user[e.target.name] = e.target.value;
		this.setState({ user });
	}
	public render() {
		const columns = [{
			title: "头像",
			dataIndex: 'avatar',
			key: 'avatar',
			width: 80,
			render: (text: string) => <Avatar src={text} size="default" />
		}, {
			title: "名称",
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => text
		}, {
			title: "昵称",
			dataIndex: 'nickname',
			key: 'nickname',
			render: (text: string) => text
		}, {
			title: "EMail",
			dataIndex: 'email',
			key: 'email',
			render: (text: string) => text
		}, {
			title: "操作",
			key: 'action',
			width: 170,
			render: (_: string, record: IUser) => {
				return (
					<Button.Group>
						<Button onClick={() => this.handleEditOpen(record)}>编辑</Button>
						<Button>删除</Button>
					</Button.Group>
				)
			}
		}];
		const editContent = this.state.edit === null ? (<div />) : (
			<div>
				<FormInput name="name" icon="user" placeholder="UserName" onChange={this.handleEditChange} value={this.state.edit.name} />
				<FormInput name="email" icon="mail" placeholder="EMail" onChange={this.handleEditChange} value={this.state.edit.email} />
				<FormInput name="nickname" icon="user" placeholder="NickName" onChange={this.handleEditChange} value={this.state.edit.nickname} />
			</div>
		);
		return (
			<div>
				<Table columns={columns} dataSource={this.state.user} loading={this.state.loading} onChange={this.handleChange} pagination={this.state.pagination} />
				<Modal title="编辑"
					visible={this.state.editShow}
					onOk={this.handleEdit}
					onCancel={() => this.setState({editShow: false})}
					confirmLoading={this.state.editLoading}>
					{editContent}
				</Modal>
			</div>
		);
	}
}

export default App;