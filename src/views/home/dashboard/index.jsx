import { useEffect } from 'react'
import { Col, Row } from 'antd';
import { connect } from 'react-redux'
import { actionCreators } from "./store";
import Card from './components/card'
import Trend from './components/trend'
import Proportion from './components/proportion'
import './style.scss'

const Dashboard = (props) => {
  const { infoCard, trend } = props
  
  useEffect(() => {
    props.getInfoCard(2020,7)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    props.getTrend(2020)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="dashboard">
      <Row gutter={32} className="dashboard-row">
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
      <Row gutter={16} className="dashboard-row">
        <Col span={24}>
          <Trend trendData={trend}></Trend>
        </Col>
      </Row>
      <Row gutter={16} className="dashboard-row">
        <Col span={24}>
          <Proportion></Proportion>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    infoCard: state.dashboard.infoCardData,
    trend: state.dashboard.trendData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCard(year, month) {
      dispatch(actionCreators.getInfoCard(year, month))
    },
    getTrend(year) {
      dispatch(actionCreators.getTrend(year))
    },
    initInfoCard(infoCardData) {
      dispatch(actionCreators.initInfoCardAction(infoCardData))
    },
    initTrend(trendData) {
      dispatch(actionCreators.initTrendAction(trendData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

