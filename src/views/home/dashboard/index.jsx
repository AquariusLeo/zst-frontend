import { useEffect } from 'react'
import { Col, Row } from 'antd';
import { connect } from 'react-redux'
import { actionCreators } from "./store";
import Card from './components/card'
import './style.scss'

const Dashboard = (props) => {
  const { infoCard } = props
  useEffect(() => {
    props.getInfoCard(2020,7)
    console.log(infoCard.salesIncrease)
  },[])
  return (
    <div className="card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="买家总数" nums={infoCard.totalCustomers} up={Number(infoCard.customerIncrease).toFixed(2)}></Card>
        </Col>
        <Col span={8}>
          <Card title="订单总数" nums={infoCard.totalOrders} up={Number(infoCard.orderIncrease).toFixed(2)}></Card>
        </Col>
        <Col span={8}>
          <Card title="总销售额" nums={infoCard.totalSales} up={Number(infoCard.salesIncrease).toFixed(2)}></Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    infoCard: state.dashboard.infoCardData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCard(year, month) {
      dispatch(actionCreators.getInfoCard(year, month))
    },
    initInfoCard(infoCardData) {
      dispatch(actionCreators.initInfoCardAction(infoCardData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)