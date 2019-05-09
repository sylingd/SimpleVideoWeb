import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createReducer from './state/reducer';
import thunkMiddleware from 'redux-thunk';
import { ConnectedRouter } from 'connected-react-router';
import loadable from '@loadable/component';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()

const store = createStore(createReducer(history), compose(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route path="/admin" component={loadable(() => import('./backend/App'))} />
				<Route path="/" component={loadable(() => import('./frontend/App'))} />
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
