import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Divider, Col, Row, Tag, Table, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ShopsPicker from '../components/shopPicker';
import ColumnPlot from './columnPlot';
import RankTable from './rankTable';
import { actionCreators } from '../store';
import { productActionCreators } from './store';
import moment from 'moment';

const columns = [
  {
    title: '产品',
    dataIndex: 'productName',
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

const columns1 = [
  {
    title: '排名',
    key: 'ranks',
    dataIndex: 'id',
    render: id => (
      <>
        {(key => {
          let color = Number(key) > 3 ? 'geekblue' : 'red';
          return (
            <Tag color={color} key={key}>
              {key}
            </Tag>
          );
        })(id)}
      </>
    ),
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'name',
  },
  {
    title: '销售额',
    dataIndex: 'value',
    key: 'sales',
  },
];

const columns2 = [
  {
    title: '排名',
    key: 'ranks',
    dataIndex: 'id',
    render: id => (
      <>
        {(key => {
          let color = Number(key) > 3 ? 'geekblue' : 'red';
          return (
            <Tag color={color} key={key}>
              {key}
            </Tag>
          );
        })(id)}
      </>
    ),
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'name',
  },
  {
    title: '销售数量',
    dataIndex: 'value',
    key: 'numbers',
  },
];

const AnalysisByProduct = props => {
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
      startTime,
      endTime,
      indicator,
      platform,
      pagination,
      searchShopValue,
    } = props;
    const shop = searchShopValue.map(item => item.key);
    if (platformDisabled) {
      props.getProductLine(startTime, endTime, indicator, [], shop);
      props.getTopTenProductNumbers(startTime, endTime, [], shop);
      props.getTopTenProductSales(startTime, endTime, [], shop);
      handlePageClick(pagination);
    } else if (shopDisabled) {
      props.getProductLine(startTime, endTime, indicator, platform, []);
      props.getTopTenProductNumbers(startTime, endTime, platform, []);
      props.getTopTenProductSales(startTime, endTime, platform, []);
      handlePageClick(pagination);
    }

    // eslint-disable-next-line
  }, [
    props.startTime,
    props.endTime,
    props.indicator,
    props.platform,
    props.searchShopValue,
  ]);

  const handlePageClick = pagination => {
    const { startTime, endTime, platform, searchShopValue } = props;
    const shop = searchShopValue.map(item => item.key);
    if (platformDisabled) {
      props.changeTableLoading(true);
      props.getProductTable(startTime, endTime, [], pagination, shop);
    } else if (shopDisabled) {
      props.changeTableLoading(true);
      props.getProductTable(startTime, endTime, platform, pagination, []);
    }
  };

  async function handleDownloadClick() {
    const { startTime, endTime, platform, searchShopValue } = props;
    const shop = searchShopValue.map(item => item.key);
    let bodyObj;
    if (platformDisabled) {
      bodyObj = {
        startTime,
        endTime,
        platform: [],
        shop,
      };
    } else if (shopDisabled) {
      bodyObj = {
        startTime,
        endTime,
        platform,
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
      const response = await fetch('/api/downloadProductTable', request);
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
        产品维度
        <div style={{ fontSize: '16px' }}>根据不同产品的销售情况进行分析</div>
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
            <ShopsPicker disabled={shopDisabled} click={handleShopClick} />
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 28]}>
          <Col span={24}>
            <ColumnPlot
              productLine={props.productLine}
              columnPlotName={props.indicator}
            />
          </Col>
          <Col span={12}>
            <RankTable
              columns={columns1}
              dataSource={props.topTenProductSales}
              name={'Top10 销售额'}
            />
          </Col>
          <Col span={12}>
            <RankTable
              columns={columns2}
              dataSource={props.topTenProductNumbers}
              name={'Top10 销售数量'}
            />
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={props.tableData}
              pagination={props.pagination}
              loading={props.loading}
              onChange={handlePageClick}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    searchShopValue: state.analysis.public.searchShopValue,
    permissionIdList: state.user.permissionIdList,
    startTime: state.analysis.public.times.startTime,
    endTime: state.analysis.public.times.endTime,
    indicator: state.analysis.public.indicator,
    platform: state.analysis.public.platform,
    productLine: state.analysis.analysisProduct.productLine,
    tableData: state.analysis.public.tableData,
    pagination: state.analysis.public.pagination,
    loading: state.analysis.public.loading,
    topTenProductSales: state.analysis.analysisProduct.topTenProductSales,
    topTenProductNumbers: state.analysis.analysisProduct.topTenProductNumbers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initPicker(times) {
      dispatch(actionCreators.initPicker(times));
    },
    getProductLine(startTime, endTime, indicator, platform, shop) {
      dispatch(
        productActionCreators.getProductLine(
          startTime,
          endTime,
          indicator,
          platform,
          shop,
        ),
      );
    },
    getProductTable(startTime, endTime, platform, pagination, shop) {
      dispatch(
        actionCreators.getProductTable(
          startTime,
          endTime,
          platform,
          pagination,
          shop,
        ),
      );
    },
    changeTableLoading(loadingStatus) {
      dispatch(actionCreators.changeTableLoading(loadingStatus));
    },
    getTopTenProductSales(startTime, endTime, platform, shop) {
      dispatch(
        productActionCreators.getTopTenProductSales(
          startTime,
          endTime,
          platform,
          shop,
        ),
      );
    },
    getTopTenProductNumbers(startTime, endTime, platform, shop) {
      dispatch(
        productActionCreators.getTopTenProductNumbers(
          startTime,
          endTime,
          platform,
          shop,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByProduct);

// const dataSource = [
//   {
//     key: '1',
//     name: 'John Brown',
//     sales: 32,
//     percent: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     sales: 42,
//     percent: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '5',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '6',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '7',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '8',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '9',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '10',
//     name: 'Joe Black',
//     sales: 32,
//     percent: 'Sidney No. 1 Lake Park',
//   },
// ];
