import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import ProductsPicker from '../components/productsPicker';
import ColumnPlot from './columnPlot';
import AnalysisTable from '../components/table';
import { actionCreators } from '../store';
import { platformActionCreators } from './store';
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
      endTime: moment(
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
      ).format('YYYY-MM-DD'),
      startTime: moment(
        `${now.getFullYear() - 1}-${now.getMonth() + 1}-${now.getDate()}`,
      ).format('YYYY-MM-DD'),
    };
  };

  useEffect(() => {
    const times = setTime();
    props.initPicker(times);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { startTime, endTime, indicator, searchValue, pagination } = props;
    const product = searchValue.map(item => item.key);
    props.getPlatformLine(startTime, endTime, indicator, product);
    handlePageClick(pagination);
  }, [props.times, props.indicator, props.searchValue]);

  const handlePageClick = pagination => {
    const { startTime, endTime, searchValue } = props;
    const product = searchValue.map(item => item.key);
    props.changeTableLoading(true);
    props.getPlatformTable(startTime, endTime, product, pagination);
  };

  return (
    <div
      style={{
        margin: '24px',
        backgroundColor: '#fff',
        padding: '24px',
      }}
    >
      <Row gutter={[16, 28]}>
        <Col span={8}>
          <TimePicker />
        </Col>
        <Col span={8}>
          <ProductsPicker />
        </Col>
        <Col span={8}>
          <IndicatorPicker />
        </Col>
      </Row>
      <Divider />
      <ColumnPlot platformLine={props.platformLine} indicator={props.indicator}/>
      <AnalysisTable
        columns={columns}
        tableData={props.tableData}
        pagination={props.pagination}
        loading={props.loading}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    startTime: state.analysis.public.times.startTime,
    endTime: state.analysis.public.times.endTime,
    indicator: state.analysis.public.indicator,
    searchValue: state.analysis.public.searchValue,
    platformLine: state.analysis.analysisPlatform.platformLine,
    tableData: state.analysis.public.tableData,
    pagination: state.analysis.public.pagination,
    loading: state.analysis.public.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initPicker(times) {
      dispatch(actionCreators.initPicker(times));
    },
    getPlatformLine(startTime, endTime, indicator, product) {
      dispatch(
        platformActionCreators.getPlatformLine(
          startTime,
          endTime,
          indicator,
          product,
        ),
      );
    },
    getPlatformTable(startTime, endTime, product, pagination) {
      dispatch(
        actionCreators.getPlatformTable(
          startTime,
          endTime,
          product,
          pagination,
        ),
      );
    },
    changeTableLoading(loadingStatus) {
      dispatch(actionCreators.changeTableLoading(loadingStatus));
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
