import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
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
						<Switch>
							<Route path="/user/login" component={loadable(() => import('./User/Login'))} />
							<Route path="/user/register" component={loadable(() => import('./User/Register'))} />
							<Route path="/video/submit" component={loadable(() => import('./Video/Submit'))} />
							<Route path="/video/list/:id" component={loadable(() => import('./Video/List'))} />
							<Route path="/video/view/:id" component={loadable(() => import('./Video/View'))} />
							<Redirect from="/" to="/video/list/all" />
						</Switch>
					</div>
				</Content>
			</Layout>
		);
	}
}

export default connect(null, { refresh })(App);
