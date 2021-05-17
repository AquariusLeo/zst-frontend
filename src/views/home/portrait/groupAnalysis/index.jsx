import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button, Descriptions } from 'antd';
import { Column, Line } from '@antv/g2plot';
import {
  getGroupDetail,
  getGeographicalDistribution,
  getPlatformDistribution,
  getProductDistribution,
  getTimeDistribution,
} from '@/api';

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
  const match = useRouteMatch();
  // console.log(match.params.id);

  const [groupDetail, setGroupDetail] = useState({});
  const [
    groupGeographicalDistribution,
    setGroupGeographicalDistribution,
  ] = useState([]);
  const [platformDistribution, setPlatformDistribution] = useState([]);
  const [productDistribution, setProductDistribution] = useState([]);
  const [timeDistribution, setTimeDistribution] = useState([]);
  useEffect(() => {
    async function getGroupDetailData() {
      const res = await getGroupDetail(match.params.id);
      if (res && res.data) {
        setGroupDetail({ ...res.data });
      }
    }
    async function getGeographicalDistributionData() {
      const res = await getGeographicalDistribution(match.params.id);
      if (res && res.data) {
        setGroupGeographicalDistribution(res.data.list);
      }
    }
    async function getPlatformDistributionData() {
      const res = await getPlatformDistribution(match.params.id);
      if (res && res.data) {
        setPlatformDistribution(res.data.list);
      }
    }

    async function getProductDistributionData() {
      const res = await getProductDistribution(match.params.id);
      if (res && res.data) {
        setProductDistribution(res.data.list);
      }
    }

    async function getTimeDistributionData() {
      const res = await getTimeDistribution(match.params.id);
      if (res && res.data) {
        setTimeDistribution(res.data.list);
      }
    }

    getGroupDetailData();

    getGeographicalDistributionData();
    getPlatformDistributionData();
    getProductDistributionData();
    getTimeDistributionData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log('groupGeographicalDistribution', groupGeographicalDistribution);
    const areaPlot = new Column('groupArea', {
      ...defaultSetting,
      data: groupGeographicalDistribution,
      xField: 'name',
      yField: 'value',
    });
    areaPlot.render();
    return () => {
      areaPlot.destroy();
    };
  }, [groupGeographicalDistribution]);

  useEffect(() => {
    const platformPlot = new Column('groupPlatform', {
      ...defaultSetting,
      data: platformDistribution,
      xField: 'name',
      yField: 'value',
    });
    platformPlot.render();
    return () => {
      platformPlot.destroy();
    };
  }, [platformDistribution]);

  useEffect(() => {
    const platformPlot = new Column('groupProduct', {
      ...defaultSetting,
      data: productDistribution,
      xField: 'name',
      yField: 'value',
    });
    platformPlot.render();
    return () => {
      platformPlot.destroy();
    };
  }, [productDistribution]);

  useEffect(() => {
    // console.log('timeDistribution', timeDistribution);
    const platformPlot = new Line('groupTime', {
      ...defaultSetting,
      data: timeDistribution,
      xField: 'name',
      yField: 'value',
      stepType: 'vh',
    });
    platformPlot.render();
    return () => {
      platformPlot.destroy();
    };
  }, [timeDistribution]);

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
            {groupDetail.name}
          </Descriptions.Item>
          <Descriptions.Item label="用户群描述">
            {groupDetail.describe}
          </Descriptions.Item>
          <Descriptions.Item label="触达用户量">
            {groupDetail.userNumber}
          </Descriptions.Item>
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

// const data = [
//   {
//     type: '湖北省',
//     sales: 38,
//   },
//   {
//     type: '福建省',
//     sales: 52,
//   },
//   {
//     type: '河南省',
//     sales: 61,
//   },
//   {
//     type: '广东省',
//     sales: 145,
//   },
//   {
//     type: '黑龙江省',
//     sales: 48,
//   },
//   {
//     type: '广西省',
//     sales: 24,
//   },
//   {
//     type: '江苏省',
//     sales: 150,
//   },
//   {
//     type: '四川省',
//     sales: 120,
//   },
//   {
//     type: '青海省',
//     sales: 68,
//   },
//   {
//     type: '辽宁省',
//     sales: 98,
//   },
// ];
