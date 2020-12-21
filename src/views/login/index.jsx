import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getLogin, getTest } from '@/api'
import './index.scss'
import logo from '@/assets/logo.png'

const Login = () => {
  async function onFinish(values) {
    const user = await getLogin({username: '111', password: '111'})
    console.log('user', user)
    localStorage.setItem('zst-token', user.data.token);
    localStorage.removeItem('zst-token')
    const success = await getTest()
    console.log('success', success)
  };  

  return ( 
    <div className="login">
      <div className="login-form-wrap">
        <header>
          <img src={logo} alt="logo" className="logo"/>
          <h1>正山堂</h1>
        </header>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login