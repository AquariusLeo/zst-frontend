import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Row, Col, Table, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ProductsPicker from '../components/productsPicker';
import TimeLevelPicker from '../components/timeLevelPicker';
import ShopsPicker from '../components/shopPicker';
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

  const [platformDisabled, setPlatformDisabled] = useState(false);
  const [shopDisabled, setShopDisabled] = useState(true);

  function handlePlatformClick() {
    setPlatformDisabled(false);
    setShopDisabled(true);
  }

  function handleShopClick() {
    setPlatformDisabled(true);
    setShopDisabled(false);
  }

  useEffect(() => {
    const {
      times,
      indicator,
      platform,
      timeLevel,
      searchValue,
      pagination,
      searchShopValue,
    } = props;
    const shop = searchShopValue.map(item => item.key);
    const product = searchValue.map(item => item.key);
    if (platformDisabled) {
      props.getTimeLine(
        times.startTime,
        times.endTime,
        indicator,
        [],
        timeLevel,
        product,
        shop,
      );
    } else if (shopDisabled) {
      props.getTimeLine(
        times.startTime,
        times.endTime,
        indicator,
        platform,
        timeLevel,
        product,
        [],
      );
    }

    handlePageClick(pagination);
    // eslint-disable-next-line
  }, [
    props.times,
    props.indicator,
    props.platform,
    props.timeLevel,
    props.searchValue,
    props.searchShopValue,
  ]);

  const handlePageClick = pagination => {
    // console.log('handlePageClick');
    const { times, platform, timeLevel, searchValue, searchShopValue } = props;
    // console.log('product', searchValue);
    const shop = searchShopValue.map(item => item.key);
    const product = searchValue.map(item => item.key);
    if (platformDisabled) {
      props.changeTableLoading(true);
      props.getTimeTable(
        times.startTime,
        times.endTime,
        [],
        timeLevel,
        product,
        pagination,
        shop,
      );
    } else if (shopDisabled) {
      props.changeTableLoading(true);
      props.getTimeTable(
        times.startTime,
        times.endTime,
        platform,
        timeLevel,
        product,
        pagination,
        [],
      );
    }
  };

  async function handleDownloadClick() {
    const { times, platform, timeLevel, searchValue, searchShopValue } = props;
    const shop = searchShopValue.map(item => item.key);
    const product = searchValue.map(item => item.key);
    let bodyObj;
    if (platformDisabled) {
      bodyObj = {
        startTime: times.startTime,
        endTime: times.endTime,
        platform: [],
        timeLevel,
        product,
        shop,
      };
    } else if (shopDisabled) {
      bodyObj = {
        startTime: times.startTime,
        endTime: times.endTime,
        platform,
        timeLevel,
        product,
        shop: [],
      };
    }
    const request = {
      body: JSON.stringify(bodyObj),
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
        {props.permissionIdList.includes(1) ? (
          <Button
            style={{ position: 'absolute', right: '24px', top: '24px' }}
            shape="round"
            icon={<DownloadOutlined />}
            onClick={handleDownloadClick}
          >
            下载
          </Button>
        ) : null}
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
            <PlatformsPicker
              disabled={platformDisabled}
              click={handlePlatformClick}
            />
          </Col>
          <Col span={8}>
            <ProductsPicker />
          </Col>
          <Col span={8}>
            <TimeLevelPicker />
          </Col>
          <Col span={8}>
            <ShopsPicker disabled={shopDisabled} click={handleShopClick} />
          </Col>
        </Row>
        <Divider />
        <TimeLine timeLine={props.timeLine} name={props.indicator} />
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={props.tableData}
          pagination={props.pagination}
          loading={props.loading}
          onChange={handlePageClick}
        />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    permissionIdList: state.user.permissionIdList,
    times: state.analysis.public.times,
    indicator: state.analysis.public.indicator,
    platform: state.analysis.public.platform,
    timeLevel: state.analysis.public.timeLevel,
    searchValue: state.analysis.public.searchValue,
    searchShopValue: state.analysis.public.searchShopValue,
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
    getTimeLine(
      startTime,
      endTime,
      indicator,
      platform,
      timeLevel,
      product,
      shop,
    ) {
      dispatch(
        timeActionCreators.getTimeLine(
          startTime,
          endTime,
          indicator,
          platform,
          timeLevel,
          product,
          shop,
        ),
      );
    },
    getTimeTable(
      startTime,
      endTime,
      platform,
      timeLevel,
      product,
      pagination,
      shop,
    ) {
      dispatch(
        actionCreators.getTimeTable(
          startTime,
          endTime,
          platform,
          timeLevel,
          product,
          pagination,
          shop,
        ),
      );
    },
    changeTableLoading(loadingStatus) {
      dispatch(actionCreators.changeTableLoading(loadingStatus));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByTime);
