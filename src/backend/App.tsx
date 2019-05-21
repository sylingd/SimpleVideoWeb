import * as React from 'react';
import { History, Location } from 'history';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { Route } from 'react-router';
import loadable from '@loadable/component';

interface IAppProps {
	history: History,
	location: Location
}

const {
	Content, Sider, Footer
} = Layout;

const urls = {
	home: "/admin/",
	user: "/admin/user",
	category: "/admin/category",
	"return-index": "/"
};

class App extends React.Component<IAppProps, {}> {
	constructor(props: any) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}
	public onSelect(e: any) {
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
						<Menu.Item key="category">
							<Icon type="menu" />
							<span className="nav-text">类型</span>
						</Menu.Item>
						<Menu.Item key="return-index">
							<Icon type="rollback" />
							<span className="nav-text">返回前台</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{ marginLeft: 200 }}>
					<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
						<div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
							<Route exact={true} path="/" component={loadable(() => import('./Home'))} />
							<Route path="/admin/user" component={loadable(() => import('./User'))} />
							<Route path="/admin/category" component={loadable(() => import('./Category'))} />
						</div>
					</Content>
					<Footer />
				</Layout>
			</Layout>
		);
	}
}

export default connect(null, {})(App);