import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Layout, Menu, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  PieChartOutlined,
  ContactsOutlined,
  CloudUploadOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import Dashboard from './dashboard';
import AnalysisByArea from './analysisData/area';
import AnalysisByPlatform from './analysisData/platform';
import AnalysisByProduct from './analysisData/product';
import AnalysisByTime from './analysisData/time';
import Groups from './portrait/groups';
import GroupAnalysis from './portrait/groupAnalysis';
import ManageUser from './manageUser';
import UploadData from './uploadData';
import UserHeader from './header';
import NotFound from './404';
import './index.scss';
import PrivateRoute from '../../routes/PrivateRoute';
// import avatar from '@/assets/avatar.svg'

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  let { path, url } = useRouteMatch();
  const history = useHistory()
  // const pathArr = [
  //   'dashboard',
  //   'analysisByArea',
  //   'analysisByPlatform',
  //   'analysisByProduct',
  //   'analysisByTime',
  //   'groups',
  //   'manageData',
  //   'uploadData',
  // ];
  // const getDefaultSelectedKey = (path, pathArr) => {
  //   return pathArr.filter(route => path.includes(route));
  // };
  // console.log(
  //   'getDefaultSelectedKey',
  //   path,
  //   getDefaultSelectedKey(path, pathArr),
  // );

  const permissionIdList = useSelector(({ user }) => user.permissionIdList);
  // console.log('permissionIdList', permissionIdList);
  return (
    // <PrivateRoute>
      <Layout className='home'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {collapsed ? (
            <div className='logo' />
          ) : (
            <div className='title'>用户画像系统</div>
          )}
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['dashboard']}>
            <Menu.Item key='dashboard' icon={<DashboardOutlined />}>
              <Link to={`${url}/dashboard`}>主页</Link>
            </Menu.Item>
            <SubMenu key='analysis' icon={<PieChartOutlined />} title='数据中心'>
              <Menu.Item key='analysisByArea'>
                <Link to={`${url}/analysisByArea`}>地区维度</Link>
              </Menu.Item>
              <Menu.Item key='analysisByPlatform'>
                <Link to={`${url}/analysisByPlatform`}>平台维度</Link>
              </Menu.Item>
              <Menu.Item key='analysisByProduct'>
                <Link to={`${url}/analysisByProduct`}>产品维度</Link>
              </Menu.Item>
              <Menu.Item key='analysisByTime'>
                <Link to={`${url}/analysisByTime`}>时间维度</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key='portrait'
              icon={<ContactsOutlined />}
              title='用户画像'
            >
              <Menu.Item key='groups'>
                <Link to={`${url}/groups`}>用户分群</Link>
              </Menu.Item>
            </SubMenu>
            {
              permissionIdList.includes(2) ? (
                <Menu.Item key='uploadData' icon={<CloudUploadOutlined />}>
                  <Link to={`${url}/uploadData`}>数据导入</Link>
                </Menu.Item>
              ) : null
            }
            {
              permissionIdList.includes(3) ? (
                <Menu.Item key='manageUser' icon={<UsergroupAddOutlined />}>
                  <Link to={`${url}/manageUser`}>权限管理</Link>
                </Menu.Item>
              ) : null
            }
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Header
            className='site-layout-background'
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
            <UserHeader />
          </Header>
          <Content className='content'>
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
              <Route exact path={`${path}/groups`}>
                <Groups />
              </Route>
              <Route exact path={`${path}/groups/:id`}>
                <GroupAnalysis />
              </Route>
              {
                permissionIdList.includes(2) ? (
                  <Route exact path={`${path}/uploadData`}>
                    <UploadData />
                  </Route>
                ) : null
              }
              {
                permissionIdList.includes(3) ? (
                  <Route exact path={`${path}/manageUser`}>
                    <ManageUser />
                  </Route>) : null
              }
              <Route component={NotFound} />
            </Switch>
            <Footer style={{ textAlign: 'center' }}>
              Analysis System ©2021 Created by MOCOM
            </Footer>
          </Content>
        </Layout>
      </Layout>
    // </PrivateRoute>
  )
};

export default Home;
