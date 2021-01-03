import React, { Component } from 'react'
import { Col, Row } from 'antd';
import Card from './components/card'
import './style.scss'

export default class Dashboard extends Component {
  render() {
    return (
      <div className="card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="买家总数" nums="100000" up="5"></Card>
          </Col>
          <Col span={8}>
            <Card title="订单总数" nums="100000" up="5"></Card>
          </Col>
          <Col span={8}>
            <Card title="总销售额" nums="100000" up="5"></Card>
          </Col>
        </Row>
      </div>
    )
  }
}
