import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Menu, Avatar, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, ExportOutlined } from '@ant-design/icons';

const UserHeader = () => {
  const username = useSelector(({ user }) => user.username);
  let history = useHistory();
  const dispatch = useDispatch();
  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case '1':
        history.push('/home/changePassword');
        break;
      case '2':
        localStorage.removeItem('zst-token');
        dispatch({
          type: 'logout',
          username: '',
          isLogin: false,
          permissionIdList: [],
        });
        message.success('登出成功');
        setTimeout(() => {
          history.push('/login');
        }, 1000);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleUserMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        修改密码
      </Menu.Item>
      <Menu.Item key="2" icon={<ExportOutlined />}>
        退出登陆
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          right: '36px',
        }}
      >
        <Dropdown overlay={menu}>
          <span>
            <Avatar icon={<UserOutlined />} />
            <span
              style={{
                fontSize: '16px',
                textAlign: 'center',
                lineHeight: '16px',
                marginLeft: '10px',
              }}
            >
              {username}
            </span>
          </span>
        </Dropdown>
      </span>
    </>
  );
};

export default UserHeader;
