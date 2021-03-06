import React, { useEffect } from 'react';
import { Pie, measureTextWidth } from '@antv/g2plot';
import './style.scss';

function renderStatistic(containerWidth, text, style) {
  const { width: textWidth, height: textHeight } = measureTextWidth(
    text,
    style,
  );
  const R = containerWidth / 2;
  // r^2 = (w / 2)^2 + (h - offsetY)^2
  let scale = 1;
  if (containerWidth < textWidth) {
    scale = Math.min(
      Math.sqrt(
        Math.abs(
          Math.pow(R, 2) /
            (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)),
        ),
      ),
      1,
    );
  }
  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
    scale < 1 ? 1 : 'inherit'
  };">${text}</div>`;
}

const Proportion = props => {
  useEffect(() => {
    const { pieData } = props;
    const piePlot = new Pie('dashboardProportion', {
      appendPadding: 10,
      data: pieData,
      angleField: 'sales',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: v => `${v} ¥`,
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: {
          textAlign: 'center',
        },
        autoRotate: false,
        content: '{value}',
      },
      statistic: {
        title: {
          offsetY: -4,
          customHtml: (container, view, datum) => {
            const { width, height } = container.getBoundingClientRect();
            const d = Math.sqrt(
              Math.pow(width / 2, 2) + Math.pow(height / 2, 2),
            );
            const text = datum ? datum.type : '销售额总计';
            return renderStatistic(d, text, { fontSize: 28 });
          },
        },
        content: {
          offsetY: 4,
          style: {
            fontSize: '28px',
          },
          customHtml: (container, view, datum, data) => {
            const { width } = container.getBoundingClientRect();
            const text = datum
              ? `¥ ${datum.sales}`
              : `¥ ${data.reduce((r, d) => r + d.sales, 0)}`;
            return renderStatistic(width, text, { fontSize: 28 });
          },
        },
      },
      interactions: [
        { type: 'element-selected' },
        { type: 'element-active' },
        { type: 'pie-statistic-active' },
      ],
    });

    piePlot.render();
    return () => {
      piePlot.destroy();
    };
    //eslint-disable-next-line
  }, [props.pieData]);
  return (
    <div className="dashboard-proportion">
      <div className="dashboard-proportion-title">平台占比</div>
      <div id="dashboardProportion"></div>
    </div>
  );
};

export default React.memo(Proportion);
