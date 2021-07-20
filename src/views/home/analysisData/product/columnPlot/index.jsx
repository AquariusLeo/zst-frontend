import React, { useEffect } from 'react';
import { Column } from '@antv/g2plot';

const ColumnPlot = props => {
  useEffect(() => {
    const columnPlot = new Column('product-columnPlot', {
      data: props.productLine,
      xField: 'name',
      yField: 'value',
      label: {
        // 配置标签文本，小于1的设为百分数
        content: (originData) => {
          if (originData.value <= 1.0) {
            const val = parseFloat(originData.value);
            return (val * 100).toFixed(2) + '%';
          }
          else{
            return originData.value;
          }
        },
        // 可手动配置 label 数据标签位置
        position: 'top', // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#000000',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoRotate: true,
        },
      },
      yAxis: {
        label: {
          formatter: (originData) => {
            if (originData <= 1.0 && originData > 0) {
              return (originData * 100).toFixed(2) + '%';
            }
            else{
              return originData;
            }
          },    
        },
      },
      tooltip: {
        formatter: (originData) => {
          if (originData.value <= 1.0) {
            return {name: 'value', value: (originData.value * 100).toFixed(2) + '%'};
          }
          else{
            return {name: 'value', value: originData.value};
          }
        }
      },
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '销售额',
        },
      },
      scrollbar: {
        type: 'horizontal',
        categorySize: 40,
      },
    });

    columnPlot.render();
    return () => {
      columnPlot.destroy();
    };
  }, [props.productLine]);
  return (
    <div>
      <div style={{ fontSize: '20px' }}>{props.columnPlotName}Top 10</div>
      <div
        id="product-columnPlot"
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
