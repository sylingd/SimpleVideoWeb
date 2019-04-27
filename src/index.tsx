import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './frontend/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from './state/reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(Reducer);

ReactDOM.render(
	<Provider store={store}>
  		<Router>
			<App />
  		</Router>
	</Provider>,
  	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
