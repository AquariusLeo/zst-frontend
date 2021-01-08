import { message } from "antd";

const checkHttpStatus = (status) => {
  switch (status) {
    case 404:
      message.error('身份认证已过期，请先登录！')
      break
    case 500:
      message.error('服务器错误，请稍后再试！')
      break
    case 504:
      message.error('服务器错误，请稍后再试！')
      break
    default:
      break
  }
}
export default checkHttpStatus