import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Video from './Video';
import Login from './User/Login';
import Register from './User/Register';
import { Layout, Menu } from 'antd';

const {
	Header, Content
} = Layout;

const SubMenu = Menu.SubMenu;

class App extends React.Component {
	public render() {
		return (
			<Layout className="app">
				<Header>
					<Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
						<Menu.Item key="main"><Link to="/">主站</Link></Menu.Item>
						<SubMenu title="分类">
							<Menu.Item key="cat:1">分类1</Menu.Item>
							<Menu.Item key="cat:2">分类2</Menu.Item>
						</SubMenu>
						<Menu.Item key="login"><Link to="/user/login">登录</Link></Menu.Item>
					</Menu>
				</Header>
				<Content className="content">
					<div className="wrapper">
						<Route exact={true} path="/" component={Home} />
						<Route path="/user/login" component={Login} />
						<Route path="/user/register" component={Register} />
						<Route path="/video/:id" component={Video} />
					</div>
				</Content>
			</Layout>
		);
	}
}

export default App;
