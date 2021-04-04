import React, { useState, useMemo, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import {
  Table,
  Modal,
  message,
  Button,
  Space,
  Form,
  Input,
  InputNumber,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getGroupTable, createGroup } from '@/api';

function Groups() {
  const { path } = useRouteMatch();
  const columns = useMemo(
    () => [
      {
        title: '用户群名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户群描述',
        dataIndex: 'describe',
        key: 'describe',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record, _, action) => (
          <Space>
            <Link to={`${path + '/' + record.id}`} key="toAnalysis">
              <Button type="primary">用户群分析</Button>
            </Link>
            <Button
              type="primary"
              key="download"
              onClick={() => {
                console.log(record);
              }}
            >
              导出名单
            </Button>
          </Space>
        ),
      },
    ],
    [],
  );

  const [tableData, setTableData] = useState([
    {
      id: 0,
      time: '2020-03-24',
      name: '111',
      describe: '111',
      operator: '111',
    },
  ]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // handleTableChange(pagination);
    // eslint-disable-next-line
  }, []);

  async function handleTableChange(pagination) {
    setLoading(true);
    const res = await getGroupTable(pagination.current, pagination.pageSize);
    if (res) {
      setTableData(res.data.list.list);
      setPagination({
        ...pagination,
        total: res.data.list.total,
      });
      setLoading(false);
    }
  }

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
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

  const [form] = Form.useForm();
  const createGroupClick = values => {
    console.log('create group', values);
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
        用户分群
        <div style={{ fontSize: '16px' }}>通过不同的指标来划分不同的用户群</div>
        <Button
          style={{ position: 'absolute', right: '24px', top: '24px' }}
          shape="circle"
          icon={<UploadOutlined />}
          onClick={showModal}
        />
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          title="新建用户群"
        >
          <Form {...formItemLayout} form={form} onFinish={createGroupClick}>
            <Form.Item
              name={'name'}
              label={'用户群名称'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'describe'}
              label={'用户群描述'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={'总消费金额'}>
              <Form.Item
                name="lowSumConsume"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: 125 }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name="highSumConsume"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: 125 }} />
              </Form.Item>
            </Form.Item>

            <Form.Item label={'每单平均金额'}>
              <Form.Item
                name="lowAveragePrice"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: 125 }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name="highAveragePrice"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: 125 }} />
              </Form.Item>
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
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default Groups;
