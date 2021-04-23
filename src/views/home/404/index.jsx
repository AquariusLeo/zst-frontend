import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const NotFound = () => {
  let history = useHistory();

  function handleClick() {
    setTimeout(() => {
      history.push('/home/dashboard');
    }, 500);
  }

  return (
    <div style={{
      minHeight: 700,
      display: 'flex',
      margin: '0 auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ fontSize: '100px' }}>404</div>
      <div style={{ margin: '0 0 30px' }}>抱歉，您访问的页面不存在。</div>
      <Button type={'primary'} onClick={handleClick}>返回首页</Button>
    </div>
  );
};

export default NotFound;
