import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { logout, refresh } from 'src/state/action/user';
import { connect } from 'react-redux';
import { ICategory } from 'src/types';

const SubMenu = Menu.SubMenu;

interface IAppProps {
	refresh: any;
	logout: any;
	user: any;
	category: ICategory[];
}

class App extends React.Component<IAppProps, {}> {
	constructor(props: any) {
		super(props);
		this.props.refresh();
	}
	public renderCategory() {
		const list = this.props.category.map(it => {
			return (<Menu.Item key={`cat:${it.id}`}>{it.name}</Menu.Item>)
		});
		return (
			<SubMenu title="分类">{list}</SubMenu>
		);
	}
	public render() {
		let UserEl;
		if (this.props.user.is) {
			UserEl = (
				<SubMenu title={this.props.user.user.nickname}>
					<Menu.Item key="submit"><Link to="/video/submit">提交视频</Link></Menu.Item>
					{this.props.user.user.is_admin ? (<Menu.Item key="admin"><Link to="/admin/">进入后台管理</Link></Menu.Item>): ""}
					<Menu.Item key="logout" onClick={this.props.logout}>登出</Menu.Item>
				</SubMenu>
			);
		} else {
			UserEl = (
				<Menu.Item key="login"><Link to="/user/login">登录</Link></Menu.Item>
			);
		}
		return (
			<Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
				<Menu.Item key="main"><Link to="/">主站</Link></Menu.Item>
				{this.renderCategory()}
				{UserEl}
			</Menu>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.user,
	category: state.category.list
});

export default connect(mapStateToProps, { refresh, logout })(App);