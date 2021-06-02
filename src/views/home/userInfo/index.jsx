import React, { useState } from 'react';
import { Input, Button, Form, Descriptions, Row, Col, Table } from 'antd';
import { userinfoByNickname, userInfoTable } from '@/api';

const columns = [
  {
    title: '成交时间',
    dataIndex: 'time',
  },
  {
    title: '订单编号',
    dataIndex: 'number',
  },
  {
    title: '品名',
    dataIndex: 'name',
  },
  {
    title: '单价',
    dataIndex: 'up',
  },
  {
    title: '数量',
    dataIndex: 'numbers',
  },
  {
    title: '金额',
    dataIndex: 'sales',
  },
];

const UserInfo = () => {
  const [form] = Form.useForm();
  const [input, setInput] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  async function handleTableChange(pagination) {
    const { username, telephone } = input;
    if (username) {
      setLoading(true);
      const res = await userInfoTable(
        username,
        pagination.current,
        pagination.pageSize,
      );
      if (res) {
        setTableData(res.data.list.list);
        setPagination({
          ...pagination,
          total: res.data.list.total,
        });
        setLoading(false);
      }
    } else if (telephone) {
    }
  }

  async function onFinish(value) {
    setInput(value);
    const { username, telephone } = input;
    if (username) {
      const res = await userinfoByNickname(username);
      if (res && res.data && res.data.userOverviewByNickname) {
        setUserInfo({ ...res.data.userOverviewByNickname });
      }
      console.log(username);
    } else if (telephone) {
      console.log(telephone);
    }
  }

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
        查询用户
        <div style={{ fontSize: '16px' }}>
          通过用户昵称或者用户电话号码对用户的购买信息进行查询
        </div>
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Row gutter={[16, 28]}>
          <Col span={24}>
            <Form form={form} layout="inline" onFinish={onFinish}>
              <Form.Item name="username">
                <Input placeholder="用户昵称" />
              </Form.Item>

              <Form.Item name="telephone">
                <Input placeholder="用户电话" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={24}>
            <Descriptions title="用户信息" bordered>
              <Descriptions.Item label="用户昵称">
                {userInfo.nickname ? userInfo.nickname : ''}
              </Descriptions.Item>
              <Descriptions.Item label="地区">
                {userInfo.place ? userInfo.place : ''}
              </Descriptions.Item>
              <Descriptions.Item label="消费金额">
                {userInfo.sales ? userInfo.sales : ''}
              </Descriptions.Item>
              <Descriptions.Item label="订单数">
                {userInfo.orders ? userInfo.orders : ''}
              </Descriptions.Item>
              <Descriptions.Item label="购买件数">
                {userInfo.numbers ? userInfo.numbers : ''}
              </Descriptions.Item>
              <Descriptions.Item label="客单价">
                {userInfo.atv ? userInfo.atv : ''}
              </Descriptions.Item>
              <Descriptions.Item label="件单价">
                {userInfo.up ? userInfo.up : ''}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24}>
            <Descriptions title="购买记录" />
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={tableData}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            ></Table>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserInfo;
