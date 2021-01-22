import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'

const UploadData = () => {
  const customRequest = (option)=> {
    const formData = new FormData();
    const fileUrl = "/api/upload";
    formData.append('file',option.file);
   
    axios.request({ /*官网解释：It's AJAX
                  All over again. Includes support
                  for xmlHttpRequest, JSONP, CORS,
                   and CommonJS Promises A.*/
      url: fileUrl,
      method: 'post',
      data: formData,
      headers: {'Content-Type':'multipart/form-data',
         'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTA0NTQzMzcsInVzZXJuYW1lIjoiY2FpIn0.Q43t4Wqjvg64j4K0xMFZD7Piv1kfP_hZubxuAfP25DM'}
    }).then(res => {
      console.log('success', res)
    }).catch(err => {
      console.log('error', err)
    })

}

  return (
    <div>
      <Upload 
        accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        customRequest={customRequest}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
}

export default UploadData
