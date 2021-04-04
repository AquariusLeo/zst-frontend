import React from 'react';
import { Form, Input, message } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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

function AddGroup() {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success('添加成功！');
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
        用户群添加
        <div style={{ fontSize: '16px' }}>选择不同的指标以添加用户群</div>
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
          onFinish={onFinish}
          name="addGroup"
        >
          <Form.Item
            name="name"
            label="用户群名称"
            rules={[
              {
                required: true,
                message: '必须输入用户群名称！',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="describe"
            label="用户群描述"
            rules={[
              {
                required: true,
                message: '必须输入用户群名称！',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default AddGroup;
