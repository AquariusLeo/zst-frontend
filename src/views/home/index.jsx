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
import AnalysisByArea from './analysisData/area'
import AnalysisByPlatform from './analysisData/platform'
import AnalysisByProduct from './analysisData/product'
import AnalysisByTime from './analysisData/time'
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
              <Link to={`${url}/analysisByTime`}>时间维度</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`${url}/analysisByArea`}>地域维度</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`${url}/analysisByProduct`}>产品维度</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to={`${url}/analysisByPlatform`}>平台维度</Link>
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
        <Content className="site-layout-background content">
          <Switch>
            <Route exact path={`${path}/dashboard`}>
              <Dashboard/>
            </Route>
            <Route exact path={`${path}/analysisByTime`}>
              <AnalysisByTime/>
            </Route>
            <Route exact path={`${path}/analysisByArea`}>
              <AnalysisByArea/>
            </Route>
            <Route exact path={`${path}/analysisByPlatform`}>
              <AnalysisByPlatform/>
            </Route>
            <Route exact path={`${path}/analysisByProduct`}>
              <AnalysisByProduct/>
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
