//Dependencies
import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Layout } from 'antd';

//CSS
import './App.css';
import './style/style.scss';

//Component
import AppRouter from "./route/appRouter";
import logo from "./assets/logo.svg";

const { Header, Content } = Layout;

function App() {
  return (
      <Provider store={store}>
          <Layout className={'app-layout'}>
              <Header className={'app-header'}>
                  <span className={'header-left'}>
                      <img src={logo} alt={'App Logo'}/>
                      <h3 className={'app-name'}>Meals</h3>
                  </span>
              </Header>
              <Content className={'app-body'}>
                  <AppRouter/>
              </Content>
          </Layout>
      </Provider>
  );
}
export default App;
