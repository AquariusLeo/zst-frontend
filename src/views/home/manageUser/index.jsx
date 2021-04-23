import React from 'react';
import { Button, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const columns = [
  {
    title: '文件名',
    dataIndex: 'file',
    key: 'name',
  },
  {
    title: '上传信息',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '上传时间',
    dataIndex: 'time',
    key: 'time',
  },
];

const ManageUser = () => {
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
        <div style={{ fontSize: '16px' }}>
          分配用户权限
        </div>
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={tableData}
          // pagination={pagination}
          // loading={loading}
          // onChange={handleTableChange}
        ></Table>
      </div>
    </>
  );
};

export default ManageUser;

const tableData = [];
