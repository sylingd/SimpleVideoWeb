import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createReducer from './state/reducer';
import thunkMiddleware from 'redux-thunk';
import { ConnectedRouter } from 'connected-react-router';
import App from './frontend/App';
import BackendApp from './backend/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()

const store = createStore(createReducer(history), compose(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route exact={true} path="/" component={App}/>
			<Route path="/admin" component={BackendApp}/>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
