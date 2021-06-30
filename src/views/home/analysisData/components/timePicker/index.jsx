import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { actionCreators } from '../../store';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { RangePicker } = DatePicker;

const TimePicker = props => {
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
        locale={locale}
        style={{ width: '300px' }}
        onChange={props.handleChange}
        defaultValue={[
          moment(props.startTime, 'YYYY-MM-DD'),
          moment(props.endTime, 'YYYY-MM-DD'),
        ]}
        format={'YYYY/MM/DD'}
      />
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
