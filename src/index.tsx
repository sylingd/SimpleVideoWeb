import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './frontend/App';
import Home from './frontend/Home';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/" component={Home}/>
    </Route>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
