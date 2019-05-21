import * as React from 'react';
import { Modal, Button, Table, message } from 'antd';
import { ICategory } from 'src/types';
import { List as CategoryList } from 'src/api/category';
import * as CategoryApi from 'src/api/admin/category';
import { PaginationConfig } from 'antd/lib/table';
import FormInput from 'src/component/FormInput';

interface IAppState {
	pagination: PaginationConfig;
	loading: boolean;
	category: ICategory[];
	edit: ICategory | null;
	editShow: boolean;
	editLoading: boolean;
}

class App extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			pagination: {},
			category: [],
			edit: null,
			editShow: false,
			editLoading: false
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);
	}
	public async load() {
		this.setState({
			loading: true
		});
		const res = await CategoryList();
		this.setState({
			loading: false
		});
		if (!(res instanceof Error)) {
			this.setState({
				category: res.list
			});
		}

	}
	public async componentDidMount() {
		await this.load();
	}

	public handleEditOpen(it?: ICategory) {
		const cat = it || {
			id: -1,
			name: ""
		};
		this.setState({
			editShow: true,
			editLoading: false,
			edit: cat
		});
	}
	public async handleEdit() {
		if (this.state.edit === null) {
			return;
		}
		this.setState({
			editLoading: true
		});
		const res = await CategoryApi.Save(this.state.edit);
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

	public render() {
		const columns = [{
			title: "ID",
			dataIndex: 'id',
			key: 'id',
			width: 80,
			render: (text: string) => text
		}, {
			title: "名称",
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => text
		}, {
			title: "操作",
			key: 'action',
			width: 170,
			render: (_: string, record: ICategory) => {
				return (
					<Button.Group>
						<Button onClick={() => this.handleEditOpen(record)}>编辑</Button>
					</Button.Group>
				)
			}
		}];
		const editContent = this.state.edit === null ? (<div />) : (
			<div>
				<FormInput name="name" icon="user" placeholder="UserName" onChange={this.handleEditChange} value={this.state.edit.name} />
			</div>
		);
		return (
			<div>
				<Table columns={columns} dataSource={this.state.category} loading={this.state.loading} pagination={this.state.pagination} rowKey="id" />
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