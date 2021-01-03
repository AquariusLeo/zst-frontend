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
import './index.scss'
// import avatar from '@/assets/avatar.svg'

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to={`${url}/dashboard`}>主页</Link>
          </Menu.Item>
          <SubMenu key="data" title="数据中心" icon={<PieChartOutlined />}>
            <Menu.Item key="2">
              <Link>时间维度</Link>
            </Menu.Item>
            <Menu.Item key="3">
              地域维度
            </Menu.Item>
            <Menu.Item key="4">
              产品维度
            </Menu.Item>
            <Menu.Item key="5">
              平台维度
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="6" icon={<UsergroupDeleteOutlined />}>
            <Link to={`${url}/portrait`}>
              用户画像
            </Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<DatabaseOutlined />}>
            <Link to={`${url}/manageData`}>
              数据管理
            </Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<CloudUploadOutlined/>}>
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
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
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
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home
