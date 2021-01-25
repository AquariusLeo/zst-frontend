import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { actionCreators } from '../../store'
const IndicatorPicker = (props) => {
  
  const indicatorsMenu = (
    <Menu onClick={props.handleIndicatorsMenuClick}>
      <Menu.Item key="销售总金额" >
        销售总金额
      </Menu.Item>
      <Menu.Item key="订单总数" >
        订单总数
      </Menu.Item>
      <Menu.Item key="销售总数量" >
        销售总数量
      </Menu.Item>
      <Menu.Item key="买家数" >
        买家数
      </Menu.Item>
      <Menu.Item key="客单价" >
        客单价
      </Menu.Item>
      <Menu.Item key="件单价" >
        件单价
      </Menu.Item>
      <Menu.Item key="连带率" >
        连带率
      </Menu.Item>
      <Menu.Item key="复购数" >
        复购数
      </Menu.Item>
      <Menu.Item key="复购率" >
        复购率
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{width: "300px"}}>
      <span style={{
        display: 'inline-block',
        width: '100px'
      }}>对比指标：</span>
      <Dropdown overlay={indicatorsMenu}>
        <Button>
          {props.indicator} <DownOutlined/>
        </Button>
      </Dropdown>
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
    handleIndicatorsMenuClick(e) {
      dispatch(actionCreators.clickIndicators(e.key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorPicker)