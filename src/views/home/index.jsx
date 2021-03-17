import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  PieChartOutlined,
  DatabaseOutlined,
  UsergroupDeleteOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import Dashboard from './dashboard';
import AnalysisByArea from './analysisData/area';
import AnalysisByPlatform from './analysisData/platform';
import AnalysisByProduct from './analysisData/product';
import AnalysisByTime from './analysisData/time';
import Portrait from './portrait';
import ManageData from './manageData';
import UploadData from './uploadData';
import UserHeader from './header';
import './index.scss';
// import avatar from '@/assets/avatar.svg'

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  let { path, url } = useRouteMatch();
  return (
    <Layout className="home">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to={`${url}/dashboard`}>主页</Link>
          </Menu.Item>
          <SubMenu key="analysis" icon={<PieChartOutlined />} title="数据中心">
            <Menu.Item key="analysisByArea">
              <Link to={`${url}/analysisByArea`}>地区维度</Link>
            </Menu.Item>
            <Menu.Item key="analysisByPlatform">
              <Link to={`${url}/analysisByPlatform`}>平台维度</Link>
            </Menu.Item>
            <Menu.Item key="analysisByProduct">
              <Link to={`${url}/analysisByProduct`}>产品维度</Link>
            </Menu.Item>
            <Menu.Item key="analysisByTime">
              <Link to={`${url}/analysisByTime`}>时间维度</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="portrait" icon={<UsergroupDeleteOutlined />}>
            <Link to={`${url}/portrait`}>用户画像</Link>
          </Menu.Item>
          <Menu.Item key="manageData" icon={<DatabaseOutlined />}>
            <Link to={`${url}/manageData`}>数据管理</Link>
          </Menu.Item>
          <Menu.Item key="uploadData" icon={<CloudUploadOutlined />}>
            <Link to={`${url}/uploadData`}>数据导入</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, borderBottom: '1px solid #EDEDED' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}
          {/* <Breadcrumb></Breadcrumb> */}
          <UserHeader></UserHeader>
        </Header>
        <Content className="content">
          <Switch>
            <Route exact path={`${path}/dashboard`}>
              <Dashboard />
            </Route>
            <Route exact path={`${path}/analysisByArea`}>
              <AnalysisByArea />
            </Route>
            <Route exact path={`${path}/analysisByPlatform`}>
              <AnalysisByPlatform />
            </Route>
            <Route exact path={`${path}/analysisByProduct`}>
              <AnalysisByProduct />
            </Route>
            <Route exact path={`${path}/analysisByTime`}>
              <AnalysisByTime />
            </Route>
            <Route exact path={`${path}/portrait`}>
              <Portrait />
            </Route>
            <Route exact path={`${path}/manageData`}>
              <ManageData />
            </Route>
            <Route exact path={`${path}/uploadData`}>
              <UploadData />
            </Route>
          </Switch>
          <Footer style={{ textAlign: 'center' }}>
            Analysis System ©2021 Created by MOCOM
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
