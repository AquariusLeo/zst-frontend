import { connect } from 'react-redux'
import { Select } from 'antd'
import { actionCreators } from '../../store'

const { Option } = Select;

const IndicatorPicker = (props) => {
 
  return (
    <div style={{width: "300px"}}>
      <span style={{
        display: 'inline-block',
        width: '100px'
      }}>对比指标：</span>
      <Select defaultValue="销售总金额" style={{ width: 120 }} onChange={props.handleIndicatorsSelectClick}>
        <Option value="销售总金额">销售总金额</Option>
        <Option value="订单总数">订单总数</Option>
        <Option value="销售总数量">销售总数量</Option>
        <Option value="买家数">买家数</Option>
        <Option value="客单价">客单价</Option>
        <Option value="件单价">件单价</Option>
        <Option value="连带率">连带率</Option>
        <Option value="复购数">复购数</Option>
        <Option value="复购率">复购率</Option>
      </Select>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    indicator: state.analysis.indicator
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleIndicatorsSelectClick(value) {
      console.log(value)
      dispatch(actionCreators.clickIndicators(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorPicker)