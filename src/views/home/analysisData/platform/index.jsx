import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Space, Divider } from 'antd';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import ProductsPicker from '../components/productsPicker';
import ColumnPlot from './columnPlot';
import AnalysisTable from '../components/table';
import { actionCreators } from '../store';
import moment from 'moment';

const columns = [
  {
    title: '平台',
    dataIndex: 'platform',
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

const AnalysisByPlatform = props => {
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
    <div
      style={{
        margin: '24px',
        backgroundColor: '#fff',
        padding: '24px',
      }}
    >
      <Space size={50} style={{ marginBottom: '20px' }}>
        <TimePicker />
        <ProductsPicker />
        <IndicatorPicker />
      </Space>
      <Divider />
      <ColumnPlot style={{ marginBottom: '20px' }} />
      <AnalysisTable
        columns={columns}
        tableData={tableData}
        pagination={props.pagination}
        loading={props.loading}
        handlePageClick={handlePageClick}
      />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByPlatform);

const tableData = [
  {
    key: 1,
    platform: 'JD',
    sales: 0,
    orders: 0,
    numbers: 10,
    consumers: 13,
  },
  {
    key: 2,
    platform: 'WeChat',
    sales: 99,
    orders: 8,
    numbers: 11,
    consumers: 26,
  },
  {
    key: 3,
    platform: 'TMall',
    sales: 71,
    orders: 6,
    numbers: 7,
    consumers: 21,
  },
  {
    key: 4,
    platform: 'Other',
    sales: 68,
    orders: 2,
    numbers: 13,
    consumers: 45,
  },
];
