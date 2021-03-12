import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { actionCreators } from '../../store';

const { RangePicker } = DatePicker;

const TimePicker = props => {
  console.log('times', props.startTime, props.endTime);
  return (
    <div>
      <span
        style={{
          display: 'inline-block',
          width: '100px',
        }}
      >
        时间范围：
      </span>
      <RangePicker
        style={{ width: '300px' }}
        onChange={props.handleChange}
        defaultValue={[
          moment(props.startTime, 'YYYY-MM-DD'),
          moment(props.endTime, 'YYYY-MM-DD'),
        ]}
        format={'YYYY/MM/DD'}
      >
        {(() => {
          console.log('startTime', props.startTime);
        })()}
      </RangePicker>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    startTime: state.analysis.public.times.startTime,
    endTime: state.analysis.public.times.endTime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(value) {
      if (value !== null) {
        const startTime = moment(value[0]).format('YYYY-MM-DD');
        const endTime = moment(value[1]).format('YYYY-MM-DD');
        dispatch(actionCreators.changeDate({ startTime, endTime }));
      }
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
