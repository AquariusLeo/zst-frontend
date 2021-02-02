import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Space, Button } from 'antd';
import TimePicker from '../components/timePicker'
import IndicatorPicker from '../components/indicatorPicker'
import PlatformsPicker from '../components/platformsPicker'
import ProductsPicker from '../components/productsPicker'
import TimeLevelPicker from '../components/timeLevelPicker'
import TimeLine from './line'
import AnalysisTable from '../components/table'
import { actionCreators } from '../store'
import moment from 'moment'
import './style.scss'

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    width: '20%',
  },
  {
    title: '销售总金额',
    dataIndex: 'sales',
    width: '20%',
  },
  {
    title: '订单总数',
    dataIndex: 'orders',
    width: '20%',
  },
  {
    title: '销售总数量',
    dataIndex: 'numbers',
    width: '20%',
  },
  {
    title: '买家数',
    dataIndex: 'consumers',
    width: '20%',
  }
];

const pagination = {
  current: 1,
  pageSize: 10,
  total: 100
}

const loading = false

const AnalysisByTime = (props) => {
  const setTime = () => {
    const now = new Date()
    return {
      startTime: moment(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`).format('YYYY-MM-DD'),
      endTime: moment(`${now.getFullYear() - 1}-${now.getMonth() + 1}-${now.getDate()}`).format('YYYY-MM-DD')
    }
  }
  
  useEffect(() => {
    const times = setTime()
    props.initPicker(times)
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    handleClick()
    // eslint-disable-next-line
  },[props.timeLevel, props.times, props.indicator, props.platform, props.searchValue])

  const handleClick = () => {
    const {times, indicator, platform, timeLevel, searchValue} = props
    const product = searchValue.map((item) => item.key)
    console.log('handleClick', times, indicator, platform, timeLevel, product)
    props.getTimeLine(times.startTime, times.endTime, indicator, platform, timeLevel, product)
  }

  return (
    <div className="analysis-by-time-container">
      <Space direction="vertical">
        <Space size={50}>
          <TimePicker/>
          <IndicatorPicker/>
          <PlatformsPicker/>
        </Space>
        <Space size={50}>
          <ProductsPicker/>
          <TimeLevelPicker/>
          <Button type="primary" style={{width: '100px', marginLeft: '200px'}} onClick={handleClick}>查询</Button>
        </Space>
      </Space>
      <TimeLine timeLine={props.timeLine}></TimeLine>
      {/* <AnalysisTable columns={columns} tableData={tableData} pagination={pagination} loading={loading}></AnalysisTable> */}
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    times: state.analysis.times,
    indicator: state.analysis.indicator,
    platform: state.analysis.platform,
    timeLevel: state.analysis.timeLevel,
    searchValue: state.analysis.searchValue,
    timeLine: state.analysis.timeLine
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPicker(times) {
      dispatch(actionCreators.initPicker(times))
    },
    getTimeLine(startTime, endTime, indicator, platform, timeLevel, product) {
      dispatch(actionCreators.getTimeLine(startTime, endTime, indicator, platform, timeLevel, product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByTime)

const tableData = [
  {
    time: '2021-01-01',
    sales: 87,
    orders: 6,
    numbers: 17,
    consumers: 14
  },
  {
    time: '2021-01-10',
    sales: 21,
    orders: 2,
    numbers: 1,
    consumers: 12
  },
  {
    time: '2021-01-20',
    sales: 84,
    orders: 8,
    numbers: 9,
    consumers: 32
  },
  {
    time: '2021-01-01',
    sales: 56,
    orders: 0,
    numbers: 7,
    consumers: 11
  },
  {
    time: '2021-01-10',
    sales: 59,
    orders: 3,
    numbers: 19,
    consumers: 3
  },
  {
    time: '2021-01-20',
    sales: 35,
    orders: 8,
    numbers: 3,
    consumers: 11
  },
  {
    time: '2021-01-01',
    sales: 39,
    orders: 5,
    numbers: 17,
    consumers: 7
  },
  {
    time: '2021-01-10',
    sales: 60,
    orders: 1,
    numbers: 5,
    consumers: 19
  },
  {
    time: '2021-01-20',
    sales: 11,
    orders: 4,
    numbers: 13,
    consumers: 15
  },
  {
    time: '2021-01-01',
    sales: 11,
    orders: 7,
    numbers: 19,
    consumers: 23
  },
  {
    time: '2021-01-10',
    sales: 89,
    orders: 1,
    numbers: 5,
    consumers: 36
  },
  {
    time: '2021-01-20',
    sales: 4,
    orders: 0,
    numbers: 16,
    consumers: 8
  },
  {
    time: '2021-01-01',
    sales: 20,
    orders: 9,
    numbers: 8,
    consumers: 30
  },
  {
    time: '2021-01-10',
    sales: 1,
    orders: 0,
    numbers: 15,
    consumers: 20
  },
  {
    time: '2021-01-20',
    sales: 31,
    orders: 5,
    numbers: 12,
    consumers: 25
  },
  {
    time: '2021-01-01',
    sales: 6,
    orders: 9,
    numbers: 16,
    consumers: 8
  },
  {
    time: '2021-01-10',
    sales: 72,
    orders: 6,
    numbers: 5,
    consumers: 9
  },
  {
    time: '2021-01-20',
    sales: 36,
    orders: 0,
    numbers: 0,
    consumers: 15
  },
  {
    time: '2021-01-01',
    sales: 65,
    orders: 8,
    numbers: 5,
    consumers: 17
  },
  {
    time: '2021-01-10',
    sales: 83,
    orders: 8,
    numbers: 17,
    consumers: 19
  },
  {
    time: '2021-01-20',
    sales: 54,
    orders: 7,
    numbers: 11,
    consumers: 18
  },
  {
    time: '2021-01-01',
    sales: 30,
    orders: 8,
    numbers: 10,
    consumers: 18
  },
  {
    time: '2021-01-10',
    sales: 6,
    orders: 6,
    numbers: 7,
    consumers: 39
  },
  {
    time: '2021-01-20',
    sales: 19,
    orders: 9,
    numbers: 3,
    consumers: 5
  },
  {
    time: '2021-01-01',
    sales: 62,
    orders: 2,
    numbers: 15,
    consumers: 4
  },
  {
    time: '2021-01-10',
    sales: 32,
    orders: 7,
    numbers: 5,
    consumers: 1
  },
  {
    time: '2021-01-20',
    sales: 16,
    orders: 0,
    numbers: 0,
    consumers: 31
  },
  {
    time: '2021-01-01',
    sales: 58,
    orders: 4,
    numbers: 15,
    consumers: 34
  },
  {
    time: '2021-01-10',
    sales: 60,
    orders: 5,
    numbers: 13,
    consumers: 48
  },
  {
    time: '2021-01-20',
    sales: 88,
    orders: 4,
    numbers: 13,
    consumers: 41
  },
  {
    time: '2021-01-01',
    sales: 69,
    orders: 3,
    numbers: 11,
    consumers: 39
  },
  {
    time: '2021-01-10',
    sales: 47,
    orders: 3,
    numbers: 17,
    consumers: 24
  },
  {
    time: '2021-01-20',
    sales: 91,
    orders: 8,
    numbers: 16,
    consumers: 39
  },
  {
    time: '2021-01-01',
    sales: 82,
    orders: 4,
    numbers: 4,
    consumers: 30
  },
  {
    time: '2021-01-10',
    sales: 39,
    orders: 4,
    numbers: 6,
    consumers: 28
  },
  { time: '2021-01-20', sales: 8, orders: 8, numbers: 4, consumers: 5 },
  {
    time: '2021-01-01',
    sales: 48,
    orders: 0,
    numbers: 2,
    consumers: 43
  },
  {
    time: '2021-01-10',
    sales: 76,
    orders: 9,
    numbers: 9,
    consumers: 47
  },
  {
    time: '2021-01-20',
    sales: 41,
    orders: 0,
    numbers: 5,
    consumers: 7
  },
  {
    time: '2021-01-01',
    sales: 55,
    orders: 5,
    numbers: 5,
    consumers: 36
  },
  {
    time: '2021-01-10',
    sales: 99,
    orders: 4,
    numbers: 15,
    consumers: 26
  },
  {
    time: '2021-01-20',
    sales: 89,
    orders: 8,
    numbers: 10,
    consumers: 21
  },
  {
    time: '2021-01-01',
    sales: 6,
    orders: 0,
    numbers: 19,
    consumers: 15
  },
  {
    time: '2021-01-10',
    sales: 86,
    orders: 4,
    numbers: 3,
    consumers: 49
  },
  {
    time: '2021-01-20',
    sales: 10,
    orders: 4,
    numbers: 4,
    consumers: 17
  },
  {
    time: '2021-01-01',
    sales: 74,
    orders: 5,
    numbers: 16,
    consumers: 33
  },
  {
    time: '2021-01-10',
    sales: 14,
    orders: 8,
    numbers: 3,
    consumers: 13
  },
  {
    time: '2021-01-20',
    sales: 70,
    orders: 0,
    numbers: 12,
    consumers: 21
  },
  {
    time: '2021-01-01',
    sales: 34,
    orders: 4,
    numbers: 10,
    consumers: 5
  },
  {
    time: '2021-01-10',
    sales: 29,
    orders: 2,
    numbers: 2,
    consumers: 10
  },
  {
    time: '2021-01-20',
    sales: 59,
    orders: 0,
    numbers: 15,
    consumers: 24
  },
  {
    time: '2021-01-01',
    sales: 4,
    orders: 0,
    numbers: 0,
    consumers: 23
  },
  {
    time: '2021-01-10',
    sales: 56,
    orders: 9,
    numbers: 2,
    consumers: 24
  },
  {
    time: '2021-01-20',
    sales: 98,
    orders: 6,
    numbers: 15,
    consumers: 31
  },
  {
    time: '2021-01-01',
    sales: 70,
    orders: 4,
    numbers: 7,
    consumers: 3
  },
  {
    time: '2021-01-10',
    sales: 38,
    orders: 7,
    numbers: 15,
    consumers: 48
  },
  {
    time: '2021-01-20',
    sales: 43,
    orders: 3,
    numbers: 18,
    consumers: 21
  },
  {
    time: '2021-01-01',
    sales: 47,
    orders: 1,
    numbers: 5,
    consumers: 5
  },
  {
    time: '2021-01-10',
    sales: 9,
    orders: 9,
    numbers: 15,
    consumers: 28
  },
  {
    time: '2021-01-20',
    sales: 34,
    orders: 7,
    numbers: 7,
    consumers: 23
  },
  {
    time: '2021-01-01',
    sales: 78,
    orders: 8,
    numbers: 8,
    consumers: 49
  },
  {
    time: '2021-01-10',
    sales: 7,
    orders: 7,
    numbers: 11,
    consumers: 49
  },
  {
    time: '2021-01-20',
    sales: 0,
    orders: 2,
    numbers: 9,
    consumers: 45
  },
  {
    time: '2021-01-01',
    sales: 73,
    orders: 6,
    numbers: 19,
    consumers: 22
  },
  {
    time: '2021-01-10',
    sales: 93,
    orders: 6,
    numbers: 3,
    consumers: 20
  },
  {
    time: '2021-01-20',
    sales: 63,
    orders: 1,
    numbers: 8,
    consumers: 10
  },
  {
    time: '2021-01-01',
    sales: 91,
    orders: 8,
    numbers: 5,
    consumers: 43
  },
  {
    time: '2021-01-10',
    sales: 11,
    orders: 4,
    numbers: 2,
    consumers: 34
  },
  {
    time: '2021-01-20',
    sales: 55,
    orders: 8,
    numbers: 10,
    consumers: 30
  },
  {
    time: '2021-01-01',
    sales: 99,
    orders: 3,
    numbers: 11,
    consumers: 36
  },
  {
    time: '2021-01-10',
    sales: 31,
    orders: 4,
    numbers: 3,
    consumers: 17
  },
  {
    time: '2021-01-20',
    sales: 69,
    orders: 4,
    numbers: 10,
    consumers: 8
  },
  {
    time: '2021-01-01',
    sales: 63,
    orders: 0,
    numbers: 0,
    consumers: 8
  },
  {
    time: '2021-01-10',
    sales: 41,
    orders: 6,
    numbers: 15,
    consumers: 12
  },
  {
    time: '2021-01-20',
    sales: 1,
    orders: 2,
    numbers: 1,
    consumers: 27
  },
  {
    time: '2021-01-01',
    sales: 72,
    orders: 4,
    numbers: 5,
    consumers: 9
  },
  {
    time: '2021-01-10',
    sales: 88,
    orders: 0,
    numbers: 11,
    consumers: 19
  },
  {
    time: '2021-01-20',
    sales: 54,
    orders: 5,
    numbers: 0,
    consumers: 46
  },
  {
    time: '2021-01-01',
    sales: 61,
    orders: 9,
    numbers: 13,
    consumers: 21
  },
  {
    time: '2021-01-10',
    sales: 20,
    orders: 0,
    numbers: 18,
    consumers: 40
  },
  {
    time: '2021-01-20',
    sales: 61,
    orders: 8,
    numbers: 0,
    consumers: 26
  },
  {
    time: '2021-01-01',
    sales: 65,
    orders: 5,
    numbers: 18,
    consumers: 37
  },
  {
    time: '2021-01-10',
    sales: 88,
    orders: 0,
    numbers: 0,
    consumers: 8
  },
  {
    time: '2021-01-20',
    sales: 44,
    orders: 0,
    numbers: 15,
    consumers: 29
  },
  {
    time: '2021-01-01',
    sales: 42,
    orders: 3,
    numbers: 11,
    consumers: 37
  },
  {
    time: '2021-01-10',
    sales: 67,
    orders: 4,
    numbers: 3,
    consumers: 20
  },
  {
    time: '2021-01-20',
    sales: 71,
    orders: 4,
    numbers: 12,
    consumers: 30
  },
  {
    time: '2021-01-01',
    sales: 95,
    orders: 3,
    numbers: 2,
    consumers: 45
  },
  {
    time: '2021-01-10',
    sales: 11,
    orders: 4,
    numbers: 1,
    consumers: 4
  },
  {
    time: '2021-01-20',
    sales: 39,
    orders: 6,
    numbers: 18,
    consumers: 6
  },
  {
    time: '2021-01-01',
    sales: 40,
    orders: 5,
    numbers: 16,
    consumers: 7
  },
  {
    time: '2021-01-10',
    sales: 42,
    orders: 7,
    numbers: 0,
    consumers: 28
  },
  {
    time: '2021-01-20',
    sales: 53,
    orders: 8,
    numbers: 18,
    consumers: 18
  },
  {
    time: '2021-01-01',
    sales: 53,
    orders: 8,
    numbers: 10,
    consumers: 25
  },
  {
    time: '2021-01-10',
    sales: 26,
    orders: 2,
    numbers: 1,
    consumers: 14
  },
  {
    time: '2021-01-20',
    sales: 88,
    orders: 3,
    numbers: 18,
    consumers: 11
  },
  {
    time: '2021-01-01',
    sales: 6,
    orders: 8,
    numbers: 9,
    consumers: 14
  },
  {
    time: '2021-01-10',
    sales: 33,
    orders: 2,
    numbers: 19,
    consumers: 32
  },
  {
    time: '2021-01-20',
    sales: 84,
    orders: 0,
    numbers: 14,
    consumers: 3
  },
  {
    time: '2021-01-01',
    sales: 75,
    orders: 0,
    numbers: 16,
    consumers: 14
  }
]