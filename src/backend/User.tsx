import * as React from 'react';
import { Table, Avatar } from 'antd';
import { IUser } from 'src/types';
import * as UserApi from 'src/api/admin/user';

interface IAppState {
	page: number;
	user: IUser[];
}

class App extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			page: 1,
			user: []
		};
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
		}]	
		return (<Table columns={columns} dataSource={this.state.user} />);
	}
	public async componentDidMount() {
		const res = await UserApi.List({
			page: this.state.page
		});
		if (!(res instanceof Error)) {
			this.setState({
				user: res.list
			});
		}
	}
}

export default App;