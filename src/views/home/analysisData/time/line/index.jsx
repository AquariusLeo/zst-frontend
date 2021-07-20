import React, { useEffect } from 'react';
import { Line } from '@antv/g2plot';

const TimeLine = props => {
  useEffect(() => {
    const { timeLine } = props;

    const line = new Line('time-line', {
      data: timeLine,
      padding: 'auto',
      xField: 'date',
      yField: 'value',
      xAxis: {
        tickCount: 10,
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
      // smooth: true,
      slider: {
        start: 0,
        end: 1,
      },
    });
    line.render();
    return () => {
      line.destroy();
    };
  }, [props, props.timeLine]);
  return (
    <>
      <div style={{ fontSize: '20px' }}>{props.name}</div>
      <div
        id="time-line"
        style={{
          margin: '40px 0',
        }}
      ></div>
    </>
  );
};

export default React.memo(TimeLine);
