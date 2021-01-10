import { useEffect } from 'react'
import { Line } from '@antv/g2plot'
import './style.scss'



const Trend = (props) => {
  console.log(props.trendData)

	useEffect(() => {
    const data = [{
      "Date": "2010-01",
      "scales": 1998
    },
    {
      "Date": "2010-02",
      "scales": 1850
    },
    {
      "Date": "2010-03",
      "scales": 1720
    },
    {
      "Date": "2010-04",
      "scales": 1818
    },
    {
      "Date": "2010-05",
      "scales": 1920
    },
    {
      "Date": "2010-06",
      "scales": 1802
    },
    {
      "Date": "2010-07",
      "scales": 1945
    },
    {
      "Date": "2010-08",
      "scales": 1856
    },
    {
      "Date": "2010-09",
      "scales": 2107
    },
    {
      "Date": "2010-10",
      "scales": 2140
    },
    {
      "Date": "2010-11",
      "scales": 2311
    }]
    const line = new Line('dashboardAmountTrend', {
      // data: props.trendData,
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        tickCount: 12,
      },
    });
    line.render()
    return () => {
      line.destroy()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.trendData])
  
	return (
		<div className="dashboard-amount-trend">
			<div className="dashboard-amount-trend-title">成交额趋势</div>
			<div id="dashboardAmountTrend"></div>
		</div>
	)
}

export default Trend
