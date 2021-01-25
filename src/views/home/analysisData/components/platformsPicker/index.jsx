import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { actionCreators } from '../../store'

const PlatformsPicker = (props) => {

  const platformMenu = (
    <Menu onClick={props.handlePlatformsMenuClick}>
      <Menu.Item key="全平台">
        全平台
      </Menu.Item>
      <Menu.Item key="天猫">
        天猫
      </Menu.Item>
      <Menu.Item key="京东">
        京东
      </Menu.Item>
      <Menu.Item key="微信">
        微信
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{width: "300px"}}>
      <span style={{
        display: 'inline-block',
        width: '100px'
      }}>平台：</span>
      <Dropdown overlay={platformMenu}>
        <Button>
          {props.platform} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    platform: state.analysis.platform
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePlatformsMenuClick(e) {
      dispatch(actionCreators.clickPlatforms(e.key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsPicker)