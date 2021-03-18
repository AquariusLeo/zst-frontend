import React, { useEffect } from 'react';
import { Column } from '@antv/g2plot';

const ColumnPlot = props => {
  useEffect(() => {
    // console.log('platformLine', props.platformLine);
    const columnPlot = new Column('platform-columnPlot', {
      data: props.platformLine,
      xField: 'name',
      yField: 'value',
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
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '销售额',
        },
      },
    });

    columnPlot.render();
    return () => {
      columnPlot.destroy();
    };
  }, [props.platformLine]);
  return (
    <div>
      <div style={{ fontSize: '20px' }}>{props.indicator}</div>
      <div
        id="platform-columnPlot"
        style={{
          margin: '40px 0',
        }}
      ></div>
    </div>
  );
};

export default React.memo(ColumnPlot);

// const data = [
//   {
//     type: '家具家电',
//     sales: 38,
//   },
//   {
//     type: '粮油副食',
//     sales: 52,
//   },
//   {
//     type: '生鲜水果',
//     sales: 61,
//   },
//   {
//     type: '美容洗护',
//     sales: 145,
//   },
//   {
//     type: '母婴用品',
//     sales: 48,
//   },
//   {
//     type: '进口食品',
//     sales: 38,
//   },
//   {
//     type: '食品饮料',
//     sales: 38,
//   },
//   {
//     type: '家庭清洁1',
//     sales: 38,
//   },
//   {
//     type: '食品饮料1',
//     sales: 38,
//   },
//   {
//     type: '家庭清洁2',
//     sales: 38,
//   },
// ];
