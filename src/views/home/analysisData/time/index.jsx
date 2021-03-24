import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Row, Col, Table, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ProductsPicker from '../components/productsPicker';
import TimeLevelPicker from '../components/timeLevelPicker';
import TimeLine from './line';
import { actionCreators } from '../store';
import { timeActionCreators } from './store';
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
    return {
      startTime: moment(moment().subtract(1, 'year').calendar()).format(
        'YYYY-MM-DD',
      ),
      endTime: moment().format('YYYY-MM-DD'),
    };
  };

  useEffect(() => {
    const times = setTime();
    props.initPicker(times);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
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
    // eslint-disable-next-line
  }, [
    props.times,
    props.indicator,
    props.platform,
    props.timeLevel,
    props.searchValue,
  ]);

  const handlePageClick = pagination => {
    console.log('handlePageClick');
    const { times, platform, timeLevel, searchValue } = props;
    // console.log('product', searchValue);
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

  async function handleDownloadClick() {
    const { times, platform, timeLevel, searchValue } = props;
    const product = searchValue.map(item => item.key);
    const request = {
      body: JSON.stringify({
        startTime: times.startTime,
        endTime: times.endTime,
        platform,
        timeLevel,
        product,
      }),
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('zst-token'),
        'content-type': 'application/json',
      },
    };
    try {
      message.info('下载中,请勿重复点击！');
      const response = await fetch('/api/downloadTimeTable', request);
      const filename = response.headers
        .get('content-disposition')
        .split(';')[1]
        .split('=')[1];
      const blob = await response.blob();
      const link = document.createElement('a');
      link.download = decodeURIComponent(filename);
      link.style.display = 'none';
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (e) {
      message.error('下载失败！');
      return;
    }

    message.success('下载成功！');
  }

  return (
    <>
      <div
        style={{
          backgroundColor: '#fff',
          fontSize: '24px',
          padding: '12px 28px',
          position: 'relative',
        }}
      >
        时间维度
        <div style={{ fontSize: '16px' }}>根据不同时间段的销售情况进行分析</div>
        <Button
          style={{ position: 'absolute', right: '24px', top: '24px' }}
          shape="circle"
          icon={<DownloadOutlined />}
          onClick={handleDownloadClick}
        />
        <div id="downloadDiv"></div>
      </div>
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
            <IndicatorPicker />
          </Col>
          <Col span={8}>
            <PlatformsPicker />
          </Col>
          <Col span={8}>
            <ProductsPicker />
          </Col>
          <Col span={8}>
            <TimeLevelPicker />
          </Col>
        </Row>
        <Divider />
        <TimeLine timeLine={props.timeLine} name={props.indicator}></TimeLine>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={props.tableData}
          pagination={props.pagination}
          loading={props.loading}
          onChange={handlePageClick}
        ></Table>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    times: state.analysis.public.times,
    indicator: state.analysis.public.indicator,
    platform: state.analysis.public.platform,
    timeLevel: state.analysis.public.timeLevel,
    searchValue: state.analysis.public.searchValue,
    timeLine: state.analysis.analysisTime.timeLine,
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
    getTimeLine(startTime, endTime, indicator, platform, timeLevel, product) {
      dispatch(
        timeActionCreators.getTimeLine(
          startTime,
          endTime,
          indicator,
          platform,
          timeLevel,
          product,
        ),
      );
    },
    getTimeTable(startTime, endTime, platform, timeLevel, product, pagination) {
      dispatch(
        actionCreators.getTimeTable(
          startTime,
          endTime,
          platform,
          timeLevel,
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByTime);
