import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Video from './Video/View';
import VideoSubmit from './Video/Submit';
import Login from './User/Login';
import Register from './User/Register';

const {
	Header, Content
} = Layout;

class App extends React.Component {
	public render() {
		return (
			<Layout className="app">
				<Header>
					<Navbar />
				</Header>
				<Content className="content">
					<div className="wrapper">
						<Route exact={true} path="/" component={Home} />
						<Route path="/user/login" component={Login} />
						<Route path="/user/register" component={Register} />
						<Route path="/video/submit" component={VideoSubmit} />
						<Route path="/video/view/:id" component={Video} />
					</div>
				</Content>
			</Layout>
		);
	}
}

export default App;
