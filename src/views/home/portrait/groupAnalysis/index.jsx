import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

function GroupAnalysis() {
  let history = useHistory();
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
        用户群分析
        <div style={{ fontSize: '16px' }}>用户群分析</div>
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            history.go(-1);
          }}
        >
          返回上页
        </Button>
      </div>
    </>
  );
}

export default GroupAnalysis;
