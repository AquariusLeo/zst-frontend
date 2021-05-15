import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { actionCreators } from '../../login/store';

export default function ChangePassword() {
  const [form] = Form.useForm();
  let history = useHistory();
  const username = useSelector(({ user }) => user.username);
  const changeDispatch = useDispatch();
  async function onFinish(values) {
    // console.log('Received values of form: ', values);
    const success = await changeDispatch(
      actionCreators.change(username, values.old, values.confirm),
    );
    console.log('1111success', success);
    if (success) {
      message.success('修改密码成功，请重新登录！');
      setTimeout(() => {
        history.push('/login');
      }, 1000);
    } else {
      message.error('修改密码失败，请检查旧密码是否正确！');
    }
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#fff',
          fontSize: '24px',
          padding: '12px 28px',
          position: 'relative',
        }}
      >
        修改密码
        <div style={{ fontSize: '16px' }}>修改密码，请保管好修改后的密码</div>
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="changePassword"
          style={{
            width: '600px',
            margin: '0 auto',
            position: 'relative',
            left: '-100px',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="old"
            label="旧密码"
            rules={[
              {
                required: true,
                message: '请输入旧密码！',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password"
            label="新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码！',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认新密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认新密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('两次输入的密码不一样！'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
