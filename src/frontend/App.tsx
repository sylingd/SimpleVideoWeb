import * as React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import { Layout } from 'antd';

const {
  Header, Content
} = Layout;

class App extends React.Component {
  public render() {
    return (
      <Layout className="App">
        <Header></Header>
        <Content>
          <Route path="/" component={Home}/>
        </Content>
      </Layout>
    );
  }
}

export default App;
