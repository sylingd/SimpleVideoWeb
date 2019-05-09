import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { refresh } from 'src/state/action/category';
import loadable from '@loadable/component';

const {
	Header, Content
} = Layout;

interface IAppProps {
	refresh: any;
}

class App extends React.Component<IAppProps, {}> {
	constructor(props: any) {
		super(props);
		this.props.refresh();
	}
	public render() {
		return (
			<Layout className="app">
				<Header>
					<Navbar />
				</Header>
				<Content className="content">
					<div className="wrapper">
						<Route exact={true} path="/" component={loadable(() => import('./Home'))} />
						<Route path="/user/login" component={loadable(() => import('./User/Login'))} />
						<Route path="/user/register" component={loadable(() => import('./User/Register'))} />
						<Route path="/video/submit" component={loadable(() => import('./Video/Submit'))} />
						<Route path="/video/view/:id" component={loadable(() => import('./Video/View'))} />
					</div>
				</Content>
			</Layout>
		);
	}
}

export default connect(null, { refresh })(App);
