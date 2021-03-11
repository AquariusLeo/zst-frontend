import { connect } from 'react-redux';
import { Select } from 'antd';
import { actionCreators } from '../../store';

const { Option } = Select;

const PlatformsPicker = props => {
  return (
    <div style={{ width: '300px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '100px',
        }}
      >
        平台：
      </span>
      <Select
        mode="multiple"
        defaultValue={['天猫', '京东', '微信']}
        style={{ width: 200 }}
        onChange={props.handlePlatformsMenuClick}
      >
        <Option value="天猫">天猫</Option>
        <Option value="京东">京东</Option>
        <Option value="微信">微信</Option>
      </Select>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    platform: state.analysis.public.platform,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handlePlatformsMenuClick(value) {
      dispatch(actionCreators.clickPlatforms(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsPicker);
