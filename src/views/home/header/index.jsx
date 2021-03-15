import { Dropdown, Menu, Avatar, message } from 'antd';
import { useHistory } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';

const UserHeader = () => {
  let history = useHistory();
  const handleUserMenuClick = () => {
    localStorage.removeItem('zst-token');
    message.success('登出成功')
    setTimeout(() => {
      history.push('/login');
    }, 1000)
  };
  const menu = (
    <Menu onClick={handleUserMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        退出登陆
      </Menu.Item>
    </Menu>
  );

  return (
    <span
      style={{
        position: 'absolute',
        right: '24px',
      }}
    >
      <Dropdown overlay={menu}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </span>
  );
};

export default UserHeader;
