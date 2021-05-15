import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Table, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ProductsPicker from '../components/productsPicker';
import ShopsPicker from '../components/shopPicker';
import Map from './map';
import ColumnPlot from './columnPlot';
import { actionCreators } from '../store';
import { areaActionCreators } from './store';
import moment from 'moment';

const columns = [
  {
    title: '省份',
    dataIndex: 'name',
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

  const handlePageClick = pagination => {
    const { times, platform, searchValue, searchShopValue } = props;
    const product = searchValue.map(item => item.key);
    const shop = searchShopValue.map(item => item.key);
    if (platformDisabled) {
      props.changeTableLoading(true);
      props.getProvinceTable(
        times.startTime,
        times.endTime,
        [],
        product,
        pagination,
        shop,
      );
    } else if (shopDisabled) {
      props.changeTableLoading(true);
      props.getProvinceTable(
        times.startTime,
        times.endTime,
        platform,
        product,
        pagination,
        [],
      );
    }
  };

  useEffect(() => {
    const {
      times,
      indicator,
      platform,
      searchValue,
      pagination,
      searchShopValue,
    } = props;
    const product = searchValue.map(item => item.key);
    const shop = searchShopValue.map(item => item.key);
    if (platformDisabled) {
      props.getProvinceMap(
        times.startTime,
        times.endTime,
        indicator,
        [],
        product,
        shop,
      );
      props.getProvinceTop(
        times.startTime,
        times.endTime,
        indicator,
        [],
        product,
        shop,
      );
    } else if (shopDisabled) {
      props.getProvinceMap(
        times.startTime,
        times.endTime,
        indicator,
        platform,
        product,
        [],
      );
      props.getProvinceTop(
        times.startTime,
        times.endTime,
        indicator,
        platform,
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
    props.searchValue,
    props.searchShopValue,
  ]);

  async function handleDownloadClick() {
    const { times, platform, searchValue, searchShopValue } = props;
    const product = searchValue.map(item => item.key);
    const shop = searchShopValue.map(item => item.key);
    let bodyObj;
    if (platformDisabled) {
      bodyObj = {
        startTime: times.startTime,
        endTime: times.endTime,
        platform: [],
        product,
        shop,
      };
    } else if (shopDisabled) {
      bodyObj = {
        startTime: times.startTime,
        endTime: times.endTime,
        platform,
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
      const response = await fetch('/api/downloadPlaceTable', request);
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

  function handlePlatformClick() {
    setPlatformDisabled(false);
    setShopDisabled(true);
  }

  function handleShopClick() {
    setPlatformDisabled(true);
    setShopDisabled(false);
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
        地区维度
        <div style={{ fontSize: '16px' }}>根据不同地区的销售情况进行分析</div>
        {props.permissionIdList.includes(1) ? (
          <Button
            style={{ position: 'absolute', right: '24px', top: '24px' }}
            // shape="circle"
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
            <ProductsPicker />
          </Col>
          <Col span={8}>
            <PlatformsPicker
              disabled={platformDisabled}
              click={handlePlatformClick}
            />
          </Col>
          <Col span={8}>
            <ShopsPicker disabled={shopDisabled} click={handleShopClick} />
          </Col>
        </Row>

        <Divider />
        <Row gutter={16} style={{ margin: '40px 0px' }}>
          <Col span={14}>
            <Map provinceMap={props.provinceMap} name={props.indicator} />
          </Col>
          <Col span={10}>
            <ColumnPlot provinceTop={props.provinceTop} />
          </Col>
        </Row>
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
    provinceMap: state.analysis.analysisArea.provinceMap,
    provinceTop: state.analysis.analysisArea.provinceTop,
    times: state.analysis.public.times,
    indicator: state.analysis.public.indicator,
    platform: state.analysis.public.platform,
    searchValue: state.analysis.public.searchValue,
    searchShopValue: state.analysis.public.searchShopValue,
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
    getProvinceMap(startTime, endTime, indicator, platform, product, shop) {
      dispatch(
        areaActionCreators.getProvinceMap(
          startTime,
          endTime,
          indicator,
          platform,
          product,
          shop,
        ),
      );
    },
    getProvinceTop(startTime, endTime, indicator, platform, product, shop) {
      dispatch(
        areaActionCreators.getProvinceTop(
          startTime,
          endTime,
          indicator,
          platform,
          product,
          shop,
        ),
      );
    },
    getProvinceTable(startTime, endTime, platform, product, pagination, shop) {
      dispatch(
        actionCreators.getProvinceTable(
          startTime,
          endTime,
          platform,
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByArea);

// const tableData = [
//   {
//     key: 1,
//     province: 'hubei',
//     sales: 0,
//     orders: 0,
//     numbers: 10,
//     consumers: 13,
//   },
//   {
//     key: 2,
//     province: 'fujian',
//     sales: 99,
//     orders: 8,
//     numbers: 11,
//     consumers: 26,
//   },
//   {
//     key: 3,
//     province: 'guangdong',
//     sales: 71,
//     orders: 6,
//     numbers: 7,
//     consumers: 21,
//   },
//   {
//     key: 4,
//     province: 'shanghai',
//     sales: 68,
//     orders: 2,
//     numbers: 13,
//     consumers: 45,
//   },
//   {
//     key: 5,
//     province: 'beijing',
//     sales: 36,
//     orders: 6,
//     numbers: 13,
//     consumers: 20,
//   },
//   {
//     key: 6,
//     province: 'hunan',
//     sales: 23,
//     orders: 4,
//     numbers: 0,
//     consumers: 49,
//   },
//   {
//     key: 7,
//     province: 'hebei',
//     sales: 15,
//     orders: 3,
//     numbers: 5,
//     consumers: 22,
//   },
//   {
//     key: 8,
//     province: 'henan',
//     sales: 43,
//     orders: 9,
//     numbers: 8,
//     consumers: 46,
//   },
//   {
//     key: 9,
//     province: 'jiangsu',
//     sales: 3,
//     orders: 0,
//     numbers: 6,
//     consumers: 21,
//   },
//   {
//     key: 10,
//     province: 'xinjiang',
//     sales: 7,
//     orders: 5,
//     numbers: 12,
//     consumers: 23,
//   },
// ];
