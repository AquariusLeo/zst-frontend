import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Card from './components/card';
import Trend from './components/trend';
import Proportion from './components/proportion';
import './style.scss';

const Dashboard = props => {
  const { infoCard, trend, pie } = props;

  const getTime = () => {
    const now = new Date();
    return Object.assign({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    });
  };

  useEffect(() => {
    props.getInfoCard(2020, 7);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log('year', getTime().year)
    props.getTrend(2020);
    // props.getTrend(getTime().year - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log('year, month',getTime().year - 1, getTime().month)
    props.getPie(2020, 7);
    // props.getPie(getTime().year - 1, getTime().month)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="dashboard">
      <Row gutter={16} className="dashboard-row">
        <Col span={6}>
          <Card
            title="买家总数"
            nums={infoCard.totalCustomers}
            up={Number(infoCard.customerIncrease).toFixed(2)}
          ></Card>
        </Col>
        <Col span={6}>
          <Card
            title="订单总数"
            nums={infoCard.totalOrders}
            up={Number(infoCard.orderIncrease).toFixed(2)}
          ></Card>
        </Col>
        <Col span={6}>
          <Card
            title="总销售额"
            nums={infoCard.totalSales}
            up={Number(infoCard.salesIncrease).toFixed(2)}
          ></Card>
        </Col>
        <Col span={6}>
          <Card
            title="总销售数量"
            nums={43521}
            up={Number(0.021).toFixed(2)}
          ></Card>
        </Col>
      </Row>
      <Row gutter={16} className="dashboard-row">
        <Col span={16}>
          <Trend trendData={trend} year={getTime().year}></Trend>
        </Col>
        <Col span={8}>
          <Proportion pieData={pie}></Proportion>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    infoCard: state.dashboard.infoCardData,
    trend: state.dashboard.trendData,
    pie: state.dashboard.pieData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInfoCard(year, month) {
      dispatch(actionCreators.getInfoCard(year, month));
    },
    getTrend(year) {
      dispatch(actionCreators.getTrend(year));
    },
    getPie(year, month) {
      dispatch(actionCreators.getPie(year, month));
    },
    initInfoCard(infoCardData) {
      dispatch(actionCreators.initInfoCardAction(infoCardData));
    },
    initTrend(trendData) {
      dispatch(actionCreators.initTrendAction(trendData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
