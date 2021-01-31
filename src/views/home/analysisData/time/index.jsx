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
  pageSize: 5,
  total: 10
}

const loading = false

const AnalysisByTime = (props) => {
  const setTime = () => {
    const now = new Date()
    return {
      startTime: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
      endTime: `${now.getFullYear() - 1}-${now.getMonth() + 1}-${now.getDate()}`
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
  },[])

  const handleClick = () => {
    const {times, indicator, platform, timeLevel, searchValue} = props
    props.getTimeLine(times.startTime, times.endTime, indicator, platform, timeLevel, searchValue)
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
          <Button type="primary" style={{width: '100px'}} onClick={handleClick}>查询</Button>
        </Space>
      </Space>
      <TimeLine></TimeLine>
      <AnalysisTable columns={columns} tableData={tableData} pagination={pagination} loading={loading}></AnalysisTable>
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    times: state.analysis.times,
    indicator: state.analysis.indicator,
    platform: state.analysis.platform,
    timeLevel: state.analysis.timeLevel,
    searchValue: state.analysis.searchValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPicker(times) {
      dispatch(actionCreators.initPicker(times))
    },
    getTimeLine(startTime, endTime, indicator, platform, timeLevel, searchValue) {
      dispatch(actionCreators.getTimeLine(startTime, endTime, indicator, platform, timeLevel, searchValue))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByTime)

const tableData = [
  {
      "time": "2021-01-01",
      "sales": 33.73274830360118,
      "orders": 9.20775490646915,
      "numbers": 7.372700904467462,
      "consumers": 14.38649884092824
  },
  {
      "time": "2021-01-10",
      "sales": 48.06162626479635,
      "orders": 0.09914182200447152,
      "numbers": 2.5124939685649084,
      "consumers": 48.89173416759228
  },
  {
      "time": "2021-01-20",
      "sales": 38.106450250543446,
      "orders": 5.988645565545538,
      "numbers": 18.997104278952737,
      "consumers": 6.729777345245768
  },
  {
      "time": "2021-01-01",
      "sales": 1.0726312124358373,
      "orders": 6.105907841221249,
      "numbers": 9.21383123026179,
      "consumers": 34.73203388164195
  },
  {
      "time": "2021-01-10",
      "sales": 21.07453280170595,
      "orders": 6.349181116841223,
      "numbers": 16.627689038261725,
      "consumers": 33.540116946634555
  },
  {
      "time": "2021-01-20",
      "sales": 44.439948287659604,
      "orders": 8.135261583351262,
      "numbers": 2.275890676777621,
      "consumers": 49.20724161369765
  },
  {
      "time": "2021-01-01",
      "sales": 22.216807221636238,
      "orders": 1.8751978272076775,
      "numbers": 7.392526478455825,
      "consumers": 47.93647890782222
  },
  {
      "time": "2021-01-10",
      "sales": 26.59538909306427,
      "orders": 5.650117555015015,
      "numbers": 4.974009796121406,
      "consumers": 14.358072880483451
  },
  {
      "time": "2021-01-20",
      "sales": 15.117196021802016,
      "orders": 8.5682245549263,
      "numbers": 5.263757096098862,
      "consumers": 11.3384880639534
  },
  {
      "time": "2021-01-01",
      "sales": 85.14318021962151,
      "orders": 4.481924256655738,
      "numbers": 6.940786723137964,
      "consumers": 21.142251936968893
  }
]
