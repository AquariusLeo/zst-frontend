import { connect } from 'react-redux';
import { Select } from 'antd';
import { actionCreators } from '../../store';

const { Option } = Select;

const TimeLevelPicker = props => {
  return (
    <div style={{ width: '300px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '100px',
        }}
      >
        时间层级：
      </span>
      <Select
        defaultValue="月度"
        style={{ width: 120 }}
        onChange={props.handleTimeLevelMenuClick}
      >
        <Option value="年度">年度</Option>
        <Option value="月度">月度</Option>
        <Option value="每日">每日</Option>
      </Select>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    timeLevel: state.analysis.timeLevel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTimeLevelMenuClick(value) {
      dispatch(actionCreators.clickTimeLevel(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeLevelPicker);
