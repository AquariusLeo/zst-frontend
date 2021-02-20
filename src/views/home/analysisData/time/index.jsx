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
import './style.scss';

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
    const { times, indicator, platform, timeLevel, searchValue, pagination } = props;
    const product = searchValue.map(item => item.key);
    props.getTimeLine(
      times.startTime,
      times.endTime,
      indicator,
      platform,
      timeLevel,
      product,
    );
    handlePageClick(pagination)
  };

  const handlePageClick = (pagination) => {
    const { times, platform, timeLevel, searchValue } = props;
    console.log('product', searchValue)
    const product = searchValue.map(item => item.key);
    props.changeTableLoading(true)
    props.getTimeTable(
      times.startTime,
      times.endTime,
      platform,
      timeLevel,
      product,
      pagination
    )
  }

  return (
    <div className="analysis-by-time-container">
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
    getTimeTable(startTime, endTime, platform, timeLevel, product, pageNum, pageSize, pagination) {
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
      dispatch(actionCreators.changeTableLoading(loadingStatus))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByTime);

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
  {
    key: 11,
    time: '2021-01-10',
    sales: 14,
    orders: 7,
    numbers: 7,
    consumers: 11,
  },
  {
    key: 12,
    time: '2021-01-20',
    sales: 70,
    orders: 0,
    numbers: 11,
    consumers: 12,
  },
  {
    key: 13,
    time: '2021-01-01',
    sales: 3,
    orders: 1,
    numbers: 0,
    consumers: 27,
  },
  {
    key: 14,
    time: '2021-01-10',
    sales: 34,
    orders: 8,
    numbers: 6,
    consumers: 45,
  },
  {
    key: 15,
    time: '2021-01-20',
    sales: 58,
    orders: 6,
    numbers: 4,
    consumers: 16,
  },
  {
    key: 16,
    time: '2021-01-01',
    sales: 20,
    orders: 5,
    numbers: 9,
    consumers: 7,
  },
  {
    key: 17,
    time: '2021-01-10',
    sales: 77,
    orders: 4,
    numbers: 13,
    consumers: 15,
  },
  {
    key: 18,
    time: '2021-01-20',
    sales: 25,
    orders: 2,
    numbers: 16,
    consumers: 12,
  },
  {
    key: 19,
    time: '2021-01-01',
    sales: 5,
    orders: 4,
    numbers: 9,
    consumers: 47,
  },
  {
    key: 20,
    time: '2021-01-10',
    sales: 75,
    orders: 2,
    numbers: 6,
    consumers: 39,
  },
  {
    key: 21,
    time: '2021-01-20',
    sales: 48,
    orders: 3,
    numbers: 15,
    consumers: 0,
  },
  {
    key: 22,
    time: '2021-01-01',
    sales: 33,
    orders: 2,
    numbers: 7,
    consumers: 25,
  },
  {
    key: 23,
    time: '2021-01-10',
    sales: 89,
    orders: 8,
    numbers: 4,
    consumers: 35,
  },
  {
    key: 24,
    time: '2021-01-20',
    sales: 39,
    orders: 6,
    numbers: 17,
    consumers: 23,
  },
  {
    key: 25,
    time: '2021-01-01',
    sales: 65,
    orders: 7,
    numbers: 12,
    consumers: 23,
  },
  {
    key: 26,
    time: '2021-01-10',
    sales: 87,
    orders: 9,
    numbers: 8,
    consumers: 12,
  },
  {
    key: 27,
    time: '2021-01-20',
    sales: 14,
    orders: 3,
    numbers: 19,
    consumers: 26,
  },
  {
    key: 28,
    time: '2021-01-01',
    sales: 57,
    orders: 7,
    numbers: 5,
    consumers: 1,
  },
  {
    key: 29,
    time: '2021-01-10',
    sales: 65,
    orders: 7,
    numbers: 16,
    consumers: 5,
  },
  {
    key: 30,
    time: '2021-01-20',
    sales: 56,
    orders: 3,
    numbers: 12,
    consumers: 5,
  },
  {
    key: 31,
    time: '2021-01-01',
    sales: 50,
    orders: 1,
    numbers: 4,
    consumers: 13,
  },
  {
    key: 32,
    time: '2021-01-10',
    sales: 47,
    orders: 7,
    numbers: 6,
    consumers: 20,
  },
  {
    key: 33,
    time: '2021-01-20',
    sales: 75,
    orders: 9,
    numbers: 9,
    consumers: 14,
  },
  {
    key: 34,
    time: '2021-01-01',
    sales: 96,
    orders: 9,
    numbers: 1,
    consumers: 45,
  },
  {
    key: 35,
    time: '2021-01-10',
    sales: 51,
    orders: 1,
    numbers: 16,
    consumers: 19,
  },
  {
    key: 36,
    time: '2021-01-20',
    sales: 1,
    orders: 1,
    numbers: 9,
    consumers: 46,
  },
  {
    key: 37,
    time: '2021-01-01',
    sales: 5,
    orders: 1,
    numbers: 3,
    consumers: 20,
  },
  {
    key: 38,
    time: '2021-01-10',
    sales: 29,
    orders: 4,
    numbers: 19,
    consumers: 17,
  },
  {
    key: 39,
    time: '2021-01-20',
    sales: 19,
    orders: 5,
    numbers: 13,
    consumers: 17,
  },
  {
    key: 40,
    time: '2021-01-01',
    sales: 67,
    orders: 8,
    numbers: 19,
    consumers: 32,
  },
  {
    key: 41,
    time: '2021-01-10',
    sales: 75,
    orders: 2,
    numbers: 9,
    consumers: 22,
  },
  {
    key: 42,
    time: '2021-01-20',
    sales: 25,
    orders: 4,
    numbers: 1,
    consumers: 25,
  },
  {
    key: 43,
    time: '2021-01-01',
    sales: 9,
    orders: 2,
    numbers: 15,
    consumers: 0,
  },
  {
    key: 44,
    time: '2021-01-10',
    sales: 7,
    orders: 8,
    numbers: 9,
    consumers: 23,
  },
  {
    key: 45,
    time: '2021-01-20',
    sales: 25,
    orders: 2,
    numbers: 13,
    consumers: 40,
  },
  {
    key: 46,
    time: '2021-01-01',
    sales: 0,
    orders: 8,
    numbers: 4,
    consumers: 29,
  },
  {
    key: 47,
    time: '2021-01-10',
    sales: 75,
    orders: 3,
    numbers: 1,
    consumers: 40,
  },
  {
    key: 48,
    time: '2021-01-20',
    sales: 40,
    orders: 5,
    numbers: 0,
    consumers: 18,
  },
  {
    key: 49,
    time: '2021-01-01',
    sales: 7,
    orders: 9,
    numbers: 7,
    consumers: 43,
  },
  {
    key: 50,
    time: '2021-01-10',
    sales: 24,
    orders: 7,
    numbers: 1,
    consumers: 18,
  },
  {
    key: 51,
    time: '2021-01-20',
    sales: 32,
    orders: 8,
    numbers: 0,
    consumers: 5,
  },
  {
    key: 52,
    time: '2021-01-01',
    sales: 23,
    orders: 9,
    numbers: 2,
    consumers: 48,
  },
  {
    key: 53,
    time: '2021-01-10',
    sales: 34,
    orders: 0,
    numbers: 16,
    consumers: 37,
  },
  {
    key: 54,
    time: '2021-01-20',
    sales: 12,
    orders: 6,
    numbers: 2,
    consumers: 10,
  },
  {
    key: 55,
    time: '2021-01-01',
    sales: 14,
    orders: 7,
    numbers: 15,
    consumers: 17,
  },
  {
    key: 56,
    time: '2021-01-10',
    sales: 13,
    orders: 8,
    numbers: 2,
    consumers: 42,
  },
  {
    key: 57,
    time: '2021-01-20',
    sales: 4,
    orders: 1,
    numbers: 15,
    consumers: 38,
  },
  {
    key: 58,
    time: '2021-01-01',
    sales: 70,
    orders: 4,
    numbers: 10,
    consumers: 31,
  },
  {
    key: 59,
    time: '2021-01-10',
    sales: 3,
    orders: 1,
    numbers: 4,
    consumers: 18,
  },
  {
    key: 60,
    time: '2021-01-20',
    sales: 67,
    orders: 8,
    numbers: 0,
    consumers: 38,
  },
  {
    key: 61,
    time: '2021-01-01',
    sales: 82,
    orders: 0,
    numbers: 19,
    consumers: 37,
  },
  {
    key: 62,
    time: '2021-01-10',
    sales: 22,
    orders: 3,
    numbers: 14,
    consumers: 0,
  },
  {
    key: 63,
    time: '2021-01-20',
    sales: 74,
    orders: 8,
    numbers: 7,
    consumers: 4,
  },
  {
    key: 64,
    time: '2021-01-01',
    sales: 48,
    orders: 7,
    numbers: 7,
    consumers: 19,
  },
  {
    key: 65,
    time: '2021-01-10',
    sales: 94,
    orders: 9,
    numbers: 16,
    consumers: 33,
  },
  {
    key: 66,
    time: '2021-01-20',
    sales: 70,
    orders: 9,
    numbers: 3,
    consumers: 8,
  },
  {
    key: 67,
    time: '2021-01-01',
    sales: 19,
    orders: 2,
    numbers: 14,
    consumers: 37,
  },
  {
    key: 68,
    time: '2021-01-10',
    sales: 34,
    orders: 8,
    numbers: 10,
    consumers: 5,
  },
  {
    key: 69,
    time: '2021-01-20',
    sales: 72,
    orders: 3,
    numbers: 17,
    consumers: 33,
  },
  {
    key: 70,
    time: '2021-01-01',
    sales: 57,
    orders: 3,
    numbers: 3,
    consumers: 39,
  },
  {
    key: 71,
    time: '2021-01-10',
    sales: 37,
    orders: 0,
    numbers: 17,
    consumers: 42,
  },
  {
    key: 72,
    time: '2021-01-20',
    sales: 57,
    orders: 3,
    numbers: 18,
    consumers: 2,
  },
  {
    key: 73,
    time: '2021-01-01',
    sales: 53,
    orders: 3,
    numbers: 9,
    consumers: 8,
  },
  {
    key: 74,
    time: '2021-01-10',
    sales: 37,
    orders: 0,
    numbers: 0,
    consumers: 49,
  },
  {
    key: 75,
    time: '2021-01-20',
    sales: 1,
    orders: 4,
    numbers: 13,
    consumers: 29,
  },
  {
    key: 76,
    time: '2021-01-01',
    sales: 67,
    orders: 0,
    numbers: 3,
    consumers: 3,
  },
  {
    key: 77,
    time: '2021-01-10',
    sales: 60,
    orders: 9,
    numbers: 2,
    consumers: 41,
  },
  {
    key: 78,
    time: '2021-01-20',
    sales: 12,
    orders: 2,
    numbers: 18,
    consumers: 36,
  },
  {
    key: 79,
    time: '2021-01-01',
    sales: 76,
    orders: 0,
    numbers: 7,
    consumers: 25,
  },
  {
    key: 80,
    time: '2021-01-10',
    sales: 68,
    orders: 1,
    numbers: 14,
    consumers: 8,
  },
  {
    key: 81,
    time: '2021-01-20',
    sales: 71,
    orders: 9,
    numbers: 12,
    consumers: 41,
  },
  {
    key: 82,
    time: '2021-01-01',
    sales: 7,
    orders: 4,
    numbers: 8,
    consumers: 32,
  },
  {
    key: 83,
    time: '2021-01-10',
    sales: 72,
    orders: 4,
    numbers: 4,
    consumers: 32,
  },
  {
    key: 84,
    time: '2021-01-20',
    sales: 30,
    orders: 9,
    numbers: 10,
    consumers: 33,
  },
  {
    key: 85,
    time: '2021-01-01',
    sales: 95,
    orders: 5,
    numbers: 13,
    consumers: 28,
  },
  {
    key: 86,
    time: '2021-01-10',
    sales: 35,
    orders: 2,
    numbers: 16,
    consumers: 2,
  },
  {
    key: 87,
    time: '2021-01-20',
    sales: 22,
    orders: 2,
    numbers: 1,
    consumers: 29,
  },
  {
    key: 88,
    time: '2021-01-01',
    sales: 30,
    orders: 7,
    numbers: 7,
    consumers: 28,
  },
  {
    key: 89,
    time: '2021-01-10',
    sales: 50,
    orders: 4,
    numbers: 17,
    consumers: 5,
  },
  {
    key: 90,
    time: '2021-01-20',
    sales: 75,
    orders: 4,
    numbers: 9,
    consumers: 17,
  },
  {
    key: 91,
    time: '2021-01-01',
    sales: 15,
    orders: 5,
    numbers: 4,
    consumers: 21,
  },
  {
    key: 92,
    time: '2021-01-10',
    sales: 53,
    orders: 9,
    numbers: 7,
    consumers: 39,
  },
  {
    key: 93,
    time: '2021-01-20',
    sales: 41,
    orders: 2,
    numbers: 15,
    consumers: 29,
  },
  {
    key: 94,
    time: '2021-01-01',
    sales: 6,
    orders: 4,
    numbers: 18,
    consumers: 6,
  },
  {
    key: 95,
    time: '2021-01-10',
    sales: 28,
    orders: 9,
    numbers: 2,
    consumers: 9,
  },
  {
    key: 96,
    time: '2021-01-20',
    sales: 44,
    orders: 1,
    numbers: 1,
    consumers: 46,
  },
  {
    key: 97,
    time: '2021-01-01',
    sales: 45,
    orders: 0,
    numbers: 14,
    consumers: 34,
  },
  {
    key: 98,
    time: '2021-01-10',
    sales: 4,
    orders: 6,
    numbers: 3,
    consumers: 34,
  },
  {
    key: 99,
    time: '2021-01-20',
    sales: 98,
    orders: 1,
    numbers: 9,
    consumers: 34,
  },
  {
    key: 100,
    time: '2021-01-01',
    sales: 11,
    orders: 2,
    numbers: 15,
    consumers: 29,
  },
];
