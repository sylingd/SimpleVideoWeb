import * as React from 'react';
import { Route } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import Home from './Home';
import User from './User';

interface IAppProps {
	history: History
}

const {
	Content, Sider, Footer
} = Layout;

class App extends React.Component<IAppProps, {}> {
	constructor(props: any) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}
	public onSelect(e: any) {
		const urls = {
			home: "/admin/",
			user: "/admin/user"
		};
		this.props.history.push(urls[e.key]);
	}
	public render() {
		return (
			<Layout>
				<Sider style={{
					overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
				}}
				>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} onSelect={this.onSelect}>
						<Menu.Item key="home">
							<Icon type="home" />
							<span className="nav-text">首页</span>
						</Menu.Item>
						<Menu.Item key="user">
							<Icon type="user" />
							<span className="nav-text">用户</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{ marginLeft: 200 }}>
					<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
						<div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
							<Route exact={true} path="/admin" component={Home} />
							<Route path="/admin/user" component={User} />
						</div>
					</Content>
					<Footer />
				</Layout>
			</Layout>
		);
	}
}

export default connect(null, {})(App);