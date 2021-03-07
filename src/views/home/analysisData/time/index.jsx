import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Space, Button } from 'antd';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ProductsPicker from '../components/productsPicker';
import TimeLevelPicker from '../components/timeLevelPicker';
import TimeLine from './line';
import AnalysisTable from '../components/table';
import { actionCreators } from '../store';
import moment from 'moment';

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
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

const AnalysisByTime = props => {
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

  useEffect(() => {
    handleClick();
    // eslint-disable-next-line
  }, [
    props.timeLevel,
    props.times,
    props.indicator,
    props.platform,
    props.searchValue,
  ]);

  const handleClick = () => {
    const {
      times,
      indicator,
      platform,
      timeLevel,
      searchValue,
      pagination,
    } = props;
    const product = searchValue.map(item => item.key);
    props.getTimeLine(
      times.startTime,
      times.endTime,
      indicator,
      platform,
      timeLevel,
      product,
    );
    handlePageClick(pagination);
  };

  const handlePageClick = pagination => {
    const { times, platform, timeLevel, searchValue } = props;
    console.log('product', searchValue);
    const product = searchValue.map(item => item.key);
    props.changeTableLoading(true);
    props.getTimeTable(
      times.startTime,
      times.endTime,
      platform,
      timeLevel,
      product,
      pagination,
    );
  };

  return (
    <div>
      <Space direction="vertical">
        <Space size={50}>
          <TimePicker />
          <IndicatorPicker />
          <PlatformsPicker />
        </Space>
        <Space size={50}>
          <ProductsPicker />
          <TimeLevelPicker />
          <Button
            type="primary"
            style={{ width: '100px', marginLeft: '200px' }}
            onClick={handleClick}
          >
            查询
          </Button>
        </Space>
      </Space>
      <TimeLine timeLine={props.timeLine}></TimeLine>
      <AnalysisTable
        columns={columns}
        tableData={props.tableData}
        pagination={props.pagination}
        loading={props.loading}
        handlePageClick={handlePageClick}
      ></AnalysisTable>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    times: state.analysis.times,
    indicator: state.analysis.indicator,
    platform: state.analysis.platform,
    timeLevel: state.analysis.timeLevel,
    searchValue: state.analysis.searchValue,
    timeLine: state.analysis.timeLine,
    tableData: state.analysis.tableData,
    pagination: state.analysis.pagination,
    loading: state.analysis.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initPicker(times) {
      dispatch(actionCreators.initPicker(times));
    },
    getTimeLine(startTime, endTime, indicator, platform, timeLevel, product) {
      dispatch(
        actionCreators.getTimeLine(
          startTime,
          endTime,
          indicator,
          platform,
          timeLevel,
          product,
        ),
      );
    },
    getTimeTable(
      startTime,
      endTime,
      platform,
      timeLevel,
      product,
      pageNum,
      pageSize,
      pagination,
    ) {
      dispatch(
        actionCreators.getTimeTable(
          startTime,
          endTime,
          platform,
          timeLevel,
          product,
          pageNum,
          pageSize,
          pagination,
        ),
      );
    },
    changeTableLoading(loadingStatus) {
      dispatch(actionCreators.changeTableLoading(loadingStatus));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByTime);
