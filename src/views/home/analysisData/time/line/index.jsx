import { useEffect } from 'react';
import { Line } from '@antv/g2plot';

const TimeLine = props => {
  useEffect(() => {
    const { timeLine } = props;

    const line = new Line('time-line', {
      data: timeLine,
      padding: 'auto',
      xField: 'data',
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
  }, [props, props.timeLine]);
  return (
    <div
      id="time-line"
      style={{
        margin: '40px 0',
      }}
    ></div>
  );
};

export default TimeLine;
