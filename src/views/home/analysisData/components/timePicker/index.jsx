import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import moment from 'moment'
import { actionCreators } from '../../store'

const { RangePicker } = DatePicker;


const TimePicker = (props) => {

  return (
    <div>
      <span style={{
        display: 'inline-block',
        width: '100px'
      }}>时间范围：</span>
      <RangePicker style={{width: '300px'}} onChange={props.handleChange}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange (value) {
      if ( value !== null ) {
        const startTime = moment(value[0]).format('YYYY-MM-DD')
        const endTime = moment(value[1]).format('YYYY-MM-DD')
        dispatch(actionCreators.changeDate({startTime, endTime}))
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimePicker)