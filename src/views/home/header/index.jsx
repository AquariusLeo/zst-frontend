import { Dropdown, Menu, Avatar  } from 'antd'
import { UserOutlined } from '@ant-design/icons';

const UserHeader = () => {

  const handleUserMenuClick = () => {
    localStorage.removeItem("zst-token")
  }
  const menu = (
    <Menu onClick={handleUserMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        退出登陆
      </Menu.Item>
    </Menu>
  );

  return (
    <span style={{
      position: 'absolute',
      right: '24px'
    }}>
      <Dropdown overlay={menu}>
        <Avatar icon={<UserOutlined />}/>
      </Dropdown>
    </span>
    
    
  )
}

export default UserHeader