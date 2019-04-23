import * as React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
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
            <Menu.Item key="main">主站</Menu.Item>
            <SubMenu title="分类">
              <Menu.Item key="cat:1">分类1</Menu.Item>
              <Menu.Item key="cat:2">分类2</Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content className="content">
          <Route path="/" component={Home} />
        </Content>
      </Layout>
    );
  }
}

export default App;
