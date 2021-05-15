import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Descriptions } from 'antd';
import { Column } from '@antv/g2plot';

const defaultSetting = {
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle', // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
};

function GroupAnalysis() {
  let history = useHistory();
  useEffect(() => {
    const areaPlot = new Column('groupArea', {
      ...defaultSetting,
      data,
      xField: 'type',
      yField: 'sales',
    });
    areaPlot.render();
    return () => {
      areaPlot.destroy();
    };
  }, []);

  useEffect(() => {
    const timePlot = new Column('groupTime', {
      ...defaultSetting,
      data,
      xField: 'type',
      yField: 'sales',
    });
    timePlot.render();
    return () => {
      timePlot.destroy();
    };
  }, []);

  useEffect(() => {
    const productPlot = new Column('groupProduct', {
      ...defaultSetting,
      data,
      xField: 'type',
      yField: 'sales',
    });
    productPlot.render();
    return () => {
      productPlot.destroy();
    };
  }, []);

  useEffect(() => {
    const platformPlot = new Column('groupPlatform', {
      ...defaultSetting,
      data,
      xField: 'type',
      yField: 'sales',
    });
    platformPlot.render();
    return () => {
      platformPlot.destroy();
    };
  }, []);
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
        <Descriptions title="用户群信息">
          <Descriptions.Item label="用户群名称">
            经常购买正山小种人群
          </Descriptions.Item>
          <Descriptions.Item label="用户群描述">
            经常购买商品包括元正·正山小种·临江240g/盒、元正·正山小种·红茶250g
          </Descriptions.Item>
          <Descriptions.Item label="触达用户量">800</Descriptions.Item>
        </Descriptions>
        <div>
          <div style={{ fontSize: '20px' }}>地域分布</div>
          <div
            id="groupArea"
            style={{
              margin: '40px 0',
            }}
          ></div>
        </div>
        <div>
          <div style={{ fontSize: '20px' }}>下单时间段统计</div>
          <div
            id="groupTime"
            style={{
              margin: '40px 0',
            }}
          ></div>
        </div>
        <div>
          <div style={{ fontSize: '20px' }}>最常购买商品</div>
          <div
            id="groupProduct"
            style={{
              margin: '40px 0',
            }}
          ></div>
        </div>
        <div>
          <div style={{ fontSize: '20px' }}>平台统计</div>
          <div
            id="groupPlatform"
            style={{
              margin: '40px 0',
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default GroupAnalysis;

const data = [
  {
    type: '湖北省',
    sales: 38,
  },
  {
    type: '福建省',
    sales: 52,
  },
  {
    type: '河南省',
    sales: 61,
  },
  {
    type: '广东省',
    sales: 145,
  },
  {
    type: '黑龙江省',
    sales: 48,
  },
  {
    type: '广西省',
    sales: 24,
  },
  {
    type: '江苏省',
    sales: 150,
  },
  {
    type: '四川省',
    sales: 120,
  },
  {
    type: '青海省',
    sales: 68,
  },
  {
    type: '辽宁省',
    sales: 98,
  },
];
