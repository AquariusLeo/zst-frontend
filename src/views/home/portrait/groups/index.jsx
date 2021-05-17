import React, { useState, useMemo, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Table, Modal, Button, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AddGroup from '../addGroup';
import { getGroupTable } from '@/api';

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
              onClick={async () => {
                const request = {
                  body: JSON.stringify({
                    id: record.id,
                  }),
                  method: 'POST',
                  headers: {
                    Authorization: localStorage.getItem('zst-token'),
                    'content-type': 'application/json',
                  },
                };
                try {
                  message.info('下载中,请勿重复点击！');
                  const response = await fetch(
                    '/api/downloadGroupUser',
                    request,
                  );
                  const filename = response.headers
                    .get('content-disposition')
                    .split(';')[1]
                    .split('=')[1];
                  const blob = await response.blob();
                  const link = document.createElement('a');
                  link.download = decodeURIComponent(filename);
                  link.style.display = 'none';
                  link.href = URL.createObjectURL(blob);
                  document.body.appendChild(link);
                  link.click();
                  URL.revokeObjectURL(link.href);
                  document.body.removeChild(link);
                } catch (e) {
                  message.error('下载失败！');
                  return;
                }

                message.success('下载成功！');
              }}
            >
              导出名单
            </Button>
          </Space>
        ),
      },
    ],
    // eslint-disable-next-line
    [],
  );

  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleTableChange(pagination);
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

  function addGroupFresh() {
    handleTableChange(pagination);
  }

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
          width={1000}
        >
          <AddGroup addGroupFresh={addGroupFresh} />
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
