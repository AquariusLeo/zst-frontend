import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { throttle } from 'lodash'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getLogin } from '@/api'
import './index.scss'
import logo from '@/assets/logo.png'

const Login = (props) => {
  let history = useHistory()
  async function onFinish(values) {
    const user = await getLogin({username: 'cai', password: '1223'})
    console.log('user', user)
    if (user.data.token) {
      localStorage.setItem('zst-token', user.data.token);
      // localStorage.removeItem('zst-token')
      // const success = await getTest()
      // console.log('success', success)
      message.success('登陆成功！')
      setTimeout(() => {
        history.push("/home/dashboard")
      },1000)
    }
    
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
          onFinish={throttle(onFinish,1000)}
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