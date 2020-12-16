import { Form, Input, Button, Checkbox } from 'antd';
import { getLogin, getTest } from '@/api'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss'
import logo from '@/assets/logo.png'

const Login = () => {
  async function onFinish(values) {
    console.log('Received values of form: ', values);
    const {username, password} = values
    const res = await getLogin({username, password})
    console.log(res)
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