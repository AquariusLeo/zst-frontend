import { useEffect } from 'react'
import { Line } from '@antv/g2plot'
import './style.scss'



const Trend = (props) => {
	useEffect(() => {
    // console.log(props.trendData)
    let {trendData, year} = props
    // console.log('trendData', trendData)
    if (trendData) {
      const data = trendData.map((obj) => {
        return Object.assign({
          month: String(year) + '-' + String(obj.mon),
          count: obj.sum
        })
      })
      // console.log(data)
      const line = new Line('dashboardAmountTrend', {
        // data: props.trendData,
        data,
        padding: 'auto',
        xField: 'month',
        yField: 'count',
        xAxis: {
          tickCount: 12,
        },
      });
      line.render()
      return () => {
        line.destroy()
      }
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
