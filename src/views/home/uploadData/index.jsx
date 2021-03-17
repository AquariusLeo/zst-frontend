import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadData = () => {
  const customRequest = option => {
    const formData = new FormData();
    const fileUrl = '/api/upload';
    formData.append('file', option.file);

    axios
      .request({
        /*官网解释：It's AJAX
                  All over again. Includes support
                  for xmlHttpRequest, JSONP, CORS,
                   and CommonJS Promises A.*/
        url: fileUrl,
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('zst-token'),
        },
      })
      .then(res => {
        console.log('success', res);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const onChange = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const state = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: localStorage.getItem('zst-token'),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Upload
        // accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        // customRequest={customRequest}
        {...state}
        // onChange={onChange}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default UploadData;
