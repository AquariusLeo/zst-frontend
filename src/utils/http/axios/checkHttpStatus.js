import { message,  notification } from 'antd';

const checkHttpStatus = status => {
  switch (status) {
    case 401:
      message.error('身份认证已过期，请先登录！');
      break;
    case 404:
      message.error('请求的数据不存在！');
      break;
    case 500:
      notification['error']({
        message:'服务器错误，请稍后再试！',
        duration: null
      });
      // message.error('服务器错误，请稍后再试！');
      break;
    case 504:
      notification['error']({
        message:'服务器错误，请稍后再试！',
        duration: null
      });
      // message.error('服务器错误，请稍后再试！');
      break;
    default:
      break;
  }
};
export default checkHttpStatus;
