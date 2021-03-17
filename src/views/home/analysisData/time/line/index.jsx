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
        tickCount: 5,
      },
      slider: {
        start: 0.1,
        end: 0.5,
      },
    });
    line.render();
    return () => {
      line.destroy();
    };
  }, [props.timeLine]);
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
