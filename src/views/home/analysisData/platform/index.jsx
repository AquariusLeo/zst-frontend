import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, Row, Col, Table, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import ProductsPicker from '../components/productsPicker';
import ColumnPlot from './columnPlot';
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
    const { startTime, endTime, indicator, searchValue, pagination } = props;
    const product = searchValue.map(item => item.key);
    props.getPlatformLine(startTime, endTime, indicator, product);
    handlePageClick(pagination);
  }, [props.startTime, props.endTime, props.indicator, props.searchValue]);

  const handlePageClick = pagination => {
    const { startTime, endTime, searchValue } = props;
    const product = searchValue.map(item => item.key);
    props.changeTableLoading(true);
    props.getPlatformTable(startTime, endTime, product, pagination);
  };

  async function handleDownloadClick() {
    const { startTime, endTime, searchValue } = props;
    const product = searchValue.map(item => item.key);
    const request = {
      body: JSON.stringify({
        startTime,
        endTime,
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
      const response = await fetch('/api/downloadPlatformTable', request);
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
        平台维度
        <div style={{ fontSize: '16px' }}>根据不同平台的销售情况进行分析</div>
        {
          props.permissionIdList.includes(1) ? (
            <Button
              style={{ position: 'absolute', right: '24px', top: '24px' }}
              shape="circle"
              icon={<DownloadOutlined />}
              onClick={handleDownloadClick}
            />
          ) : null
        }
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
            <ProductsPicker />
          </Col>
          <Col span={8}>
            <IndicatorPicker />
          </Col>
        </Row>
        <Divider />
        <ColumnPlot
          platformLine={props.platformLine}
          indicator={props.indicator}
        />
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

// const tableData = [
//   {
//     key: 1,
//     platform: 'JD',
//     sales: 0,
//     orders: 0,
//     numbers: 10,
//     consumers: 13,
//   },
//   {
//     key: 2,
//     platform: 'WeChat',
//     sales: 99,
//     orders: 8,
//     numbers: 11,
//     consumers: 26,
//   },
//   {
//     key: 3,
//     platform: 'TMall',
//     sales: 71,
//     orders: 6,
//     numbers: 7,
//     consumers: 21,
//   },
//   {
//     key: 4,
//     platform: 'Other',
//     sales: 68,
//     orders: 2,
//     numbers: 13,
//     consumers: 45,
//   },
// ];
