import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Space, Row, Col, Divider } from 'antd';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ProductsPicker from '../components/productsPicker';
import Map from './map';
import ColumnPlot from './columnPlot';
import AnalysisTable from '../components/table';
import { actionCreators } from '../store';
import moment from 'moment';

const columns = [
  {
    title: '省份',
    dataIndex: 'province',
    width: '20%',
  },
  {
    title: '销售总金额',
    dataIndex: 'sales',
    width: '20%',
  },
  {
    title: '订单总数',
    dataIndex: 'orders',
    width: '20%',
  },
  {
    title: '销售总数量',
    dataIndex: 'numbers',
    width: '20%',
  },
  {
    title: '买家数',
    dataIndex: 'consumers',
    width: '20%',
  },
];

const AnalysisByArea = props => {
  const setTime = () => {
    const now = new Date();
    return {
      startTime: moment(
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
      ).format('YYYY-MM-DD'),
      endTime: moment(
        `${now.getFullYear() - 1}-${now.getMonth() + 1}-${now.getDate()}`,
      ).format('YYYY-MM-DD'),
    };
  };

  useEffect(() => {
    const times = setTime();
    props.initPicker(times);
    // eslint-disable-next-line
  }, []);

  const handlePageClick = () => {};

  return (
    <>
      <div
        style={{
          backgroundColor: '#fff',
          fontSize: '24px',
          padding: '12px 28px',
        }}
      >
        地区维度
        <div style={{ fontSize: '16px' }}>根据不同地区的销售情况进行分析</div>
      </div>
      <div
        style={{
          margin: '24px',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Space direction="vertical">
          <Space size={50}>
            <TimePicker />
            <IndicatorPicker />
            <PlatformsPicker />
          </Space>
          <Space size={50}>
            <ProductsPicker />
          </Space>
        </Space>
        <Divider />
        <Row gutter={16} style={{ margin: '40px 0px' }}>
          <Col span={14}>
            <Map></Map>
          </Col>
          <Col span={10}>
            <ColumnPlot />
          </Col>
        </Row>
        <AnalysisTable
          columns={columns}
          tableData={tableData}
          pagination={props.pagination}
          loading={props.loading}
          handlePageClick={handlePageClick}
        ></AnalysisTable>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    initPicker(times) {
      dispatch(actionCreators.initPicker(times));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByArea);

const tableData = [
  {
    key: 1,
    time: '2021-01-01',
    sales: 0,
    orders: 0,
    numbers: 10,
    consumers: 13,
  },
  {
    key: 2,
    time: '2021-01-10',
    sales: 99,
    orders: 8,
    numbers: 11,
    consumers: 26,
  },
  {
    key: 3,
    time: '2021-01-20',
    sales: 71,
    orders: 6,
    numbers: 7,
    consumers: 21,
  },
  {
    key: 4,
    time: '2021-01-01',
    sales: 68,
    orders: 2,
    numbers: 13,
    consumers: 45,
  },
  {
    key: 5,
    time: '2021-01-10',
    sales: 36,
    orders: 6,
    numbers: 13,
    consumers: 20,
  },
  {
    key: 6,
    time: '2021-01-20',
    sales: 23,
    orders: 4,
    numbers: 0,
    consumers: 49,
  },
  {
    key: 7,
    time: '2021-01-01',
    sales: 15,
    orders: 3,
    numbers: 5,
    consumers: 22,
  },
  {
    key: 8,
    time: '2021-01-10',
    sales: 43,
    orders: 9,
    numbers: 8,
    consumers: 46,
  },
  {
    key: 9,
    time: '2021-01-20',
    sales: 3,
    orders: 0,
    numbers: 6,
    consumers: 21,
  },
  {
    key: 10,
    time: '2021-01-01',
    sales: 7,
    orders: 5,
    numbers: 12,
    consumers: 23,
  },
];
