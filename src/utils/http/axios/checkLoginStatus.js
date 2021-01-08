import { message } from "antd";

const checkLoginStatus = (data) => {
  switch (data.status) {
    case 400:
      message.error('身份认证失败或过期，请重新登陆')
      console.log()
      break
    case 401:
      message.error('身份认证失败或过期，请重新登陆')
      break
    case 500:
      message.error('服务器错误，请稍后再试！')
      break
    default:
      break
  }
}
export default checkLoginStatus