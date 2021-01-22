import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import moment from 'moment'
import { actionCreators } from '../../store'

const { RangePicker } = DatePicker;


const TimePicker = (props) => {
  return (
    <div>
      <span>时间范围：</span>
      <RangePicker  onChange={props.handleChange}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    times: state.analysis.times
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange (value) {
      if ( value !== null ) {
        const startDate = moment(value[0]).format('YYYY-MM-DD')
        const endDate = moment(value[1]).format('YYYY-MM-DD')
        dispatch(actionCreators.changeDate({startDate, endDate}))
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimePicker)