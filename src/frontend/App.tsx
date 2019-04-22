import * as React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Route path="/" component={Home}/>
      </div>
    );
  }
}

export default App;
