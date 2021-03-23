import { useState } from 'react';
import { Upload, Button, message, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadData = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const handleUpload = () => {
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
    form.resetFields();
    handleUpload();
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
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
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
      </div>
    </>
  );
};

export default UploadData;
