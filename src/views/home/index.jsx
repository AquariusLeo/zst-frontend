import React, { useState } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
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
import Dashboard from './dashboard'
import Analysis from './analysisData'
import Portrait from './portrait'
import ManageData from './manageData'
import UploadData from './uploadData'
import UserHeader from './header'
import './index.scss'
// import avatar from '@/assets/avatar.svg'

const { Header, Content, Sider, Footer } = Layout;
const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  let { path, url } = useRouteMatch();
  return (
    <Layout className="home">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to={`${url}/dashboard`}>主页</Link>
          </Menu.Item>
          <Menu.Item key="analysis" icon={<PieChartOutlined />}>
            <Link to={`${url}/analysis`}>数据中心</Link>
          </Menu.Item>
          <Menu.Item key="portrait" icon={<UsergroupDeleteOutlined />}>
            <Link to={`${url}/portrait`}>
              用户画像
            </Link>
          </Menu.Item>
          <Menu.Item key="manageData" icon={<DatabaseOutlined />}>
            <Link to={`${url}/manageData`}>
              数据管理
            </Link>
          </Menu.Item>
          <Menu.Item key="uploadData" icon={<CloudUploadOutlined/>}>
            <Link to={`${url}/uploadData`}>
              数据导入
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <UserHeader></UserHeader>
        </Header>
        <Content className="content">
          <Switch>
            <Route exact path={`${path}/dashboard`}>
              <Dashboard/>
            </Route>
            <Route exact path={`${path}/analysis`}>
              <Analysis/>
            </Route>
            <Route exact path={`${path}/portrait`}>
              <Portrait/>
            </Route>
            <Route exact path={`${path}/manageData`}>
              <ManageData/>
            </Route>
            <Route exact path={`${path}/uploadData`}>
              <UploadData/>
            </Route>
          </Switch>
          <Footer style={{ textAlign: 'center' }}>Analysis System ©2021 Created by MOCOM</Footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home
