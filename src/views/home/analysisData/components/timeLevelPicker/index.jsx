import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { actionCreators } from '../../store'

const TimeLevelPicker = (props) => {

  const timeLevelMenu = (
    <Menu onClick={props.handleTimeLevelMenuClick}>
      <Menu.Item key="年度">
        年度
      </Menu.Item>
      <Menu.Item key="月度">
        月度
      </Menu.Item>
      <Menu.Item key="每日">
        每日
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{width: "300px"}}>
      <span>时间层级：</span>
      <Dropdown overlay={timeLevelMenu}>
        <Button>
          {props.timeLevel} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    timeLevel: state.analysis.timeLevel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleTimeLevelMenuClick(e) {
      dispatch(actionCreators.clickTimeLevel(e.key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLevelPicker)