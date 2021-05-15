import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Checkbox,
  message,
  Popconfirm,
  Tag,
} from 'antd';
import { addUser, getAllUser, deleteUser } from '@/api';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const options = [
  { label: '下载表格', value: 1 },
  { label: '上传表格', value: 2 },
  { label: '管理账户', value: 3 },
];

const ManageUser = () => {
  const [tableData, setTableData] = useState([]);

  const columns = useMemo(
    () => [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '权限',
        dataIndex: 'permissionIdList',
        render: permissionIdList => (
          <>
            {permissionIdList.map(permission => {
              let color = 'geekblue';
              switch (permission) {
                case 1:
                  return (
                    <Tag color={color} key={permission}>
                      {'下载表格'}
                    </Tag>
                  );
                case 2:
                  color = 'green';
                  return (
                    <Tag color={color} key={permission}>
                      {'上传表格'}
                    </Tag>
                  );
                case 3:
                  color = 'volcano';
                  return (
                    <Tag color={color} key={permission}>
                      {'添加或删除用户'}
                    </Tag>
                  );
                default:
                  return null;
              }
            })}
          </>
        ),
      },
      {
        title: 'Action',
        dataIndex: '',
        render: (_, record) =>
          tableData.length >= 0 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              {/* eslint-disable-next-line */}
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ],
    // eslint-disable-next-line
    [],
  );

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function submit(values) {
    console.log(
      values.username,
      values.password,
      values.permissionIdList || [],
    );
    const res = await addUser(
      values.username,
      values.password,
      values.permissionIdList || [],
    );
    if (res && res.status === 200) {
      message.success('新建用户成功');
      form.resetFields();
      getFormList();
    }
  }

  useEffect(() => {
    getFormList();
  }, []);

  async function getFormList() {
    const res = await getAllUser();
    if (res && res.data && res.data.userList) {
      setTableData(res.data.userList);
    }
  }

  const handleDelete = async key => {
    const res = await deleteUser(key);
    if (res && res.status === 200) {
      message.success('用户删除成功!');
      getFormList();
    }
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
        权限管理
        <div style={{ fontSize: '16px' }}>分配用户权限</div>
        <Button
          style={{ position: 'absolute', right: '24px', top: '24px' }}
          type={'primary'}
          onClick={showModal}
        >
          新建用户
        </Button>
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Modal
          title="新建用户"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form onFinish={submit} {...formItemLayout} form={form}>
            <Form.Item
              name={'username'}
              label={'用户名'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={'password'}
              label={'密  码'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name={'permissionIdList'} label={'用户权限'}>
              <Checkbox.Group options={options} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                新建
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={tableData}
          pagination={false}
        />
      </div>
    </>
  );
};

export default ManageUser;
