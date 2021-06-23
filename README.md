## 代码说明

### 项目结构

- api文件夹

所有的api请求都在这里

- assets文件夹

主要是引入首页的四个icon

- routes文件夹

暂时没用，后期可以添加拦截路由

- store文件夹

redux状态管理相关文件

- style文件夹

初始化样式

- utils文件夹

axios请求封装，拦截器等等

- views文件夹

分为两个页面login以及home，home中又按照功能模块分为相应的文件夹，每个文件夹中有页面代码以及store代码，component文件夹则为组件代码

### 如何在本机上运行调试

1. 安装nodejs
2. 使用nodejs安装yarn包管理器
3. 进入代码根目录，运行`yarn`，根据package.json安装依赖
4. 运行代码，输入命令`yarn start`
5. 打开浏览器访问localhost:8080，用户名为zst，密码为1223

### 部署至服务器

- 编译前端代码：在项目根目录中运行`npm run build`，会生成build文件夹，其中的文件就是编译好的文件
- 目前项目部署在59.77.7.58，通过nginx进行了代理，nginx已经设置好，后续部署只需要将build文件夹下编译好的文件拷贝到服务器的`/usr/local/nginx/html/`目录下，再转到`/usr/local/nginx/sbin/`目录下用命令`./nginx -s reload`重启nginx，即可完成部署。对nginx的安装有兴趣可以参考[链接](https://lwrench.github.io/blog/article/%E5%BC%80%E5%8F%91%E6%97%A5%E5%BF%97/nginx%E9%83%A8%E7%BD%B2%E9%A1%B9%E7%9B%AE.html)
- 可以使用`ps aux | grep nginx`和`netstat -ntlp | grep nginx`命令查看运行状态和端口状态

### tips

- 目前由于数据原因，只有2020年数据，所以所有的请求都进行了预处理，在发送请求时关于时间的参数都进行了手动设置，后续需要添加
- 多维数据展示的页面使用了redux，后续的页面没有使用redux

