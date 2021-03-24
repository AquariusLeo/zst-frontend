import { useState, useEffect } from 'react';
import { Upload, Button, message, Form, Input, Table, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getUploadTable } from '@/api';

const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name',
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

const UploadData = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const uploadProp = {
    onRemove: file => {
      setFileList([]);
      return {
        fileList: [],
      };
    },
    beforeUpload: file => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const onFinish = values => {
    console.log(values);

    const formData = new FormData();
    formData.append('file', fileList[0]);
    setUploading(true);

    axios
      .request({
        url: '/api/upload',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('zst-token'),
        },
      })
      .then(res => {
        setFileList([]);
        setUploading(false);
        message.success('upload successfully.');
      })
      .catch(err => {
        setUploading(false);
        message.error('upload failed.');
      });

    form.resetFields();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    handleTableChange(pagination)
    // eslint-disable-next-line
  }, [])

  async function handleTableChange (pagination) {
    setLoading(true)
    const res = await getUploadTable(pagination.current, pagination.pageSize)
    if (res) {
      setTableData(res.data.list.list)
      setPagination({
        ...pagination,
        total: res.data.list.total
      })
      setLoading(false)
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
        上传数据
        <div style={{ fontSize: '16px' }}>
          将文件上传到服务器，应用会自动分析
        </div>
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
          title="上传文件"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form {...formItemLayout} form={form} onFinish={onFinish}>
            <Form.Item
              name={'label'}
              label={'信息'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'operator'}
              label={'操作人'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="upload" label="选择文件">
              <Upload {...uploadProp}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button
                type="primary"
                disabled={fileList.length === 0}
                loading={uploading}
                htmlType="submit"
              >
                {uploading ? 'Uploading' : 'Start Upload'}
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
        ></Table>
      </div>
    </>
  );
};

export default UploadData;
