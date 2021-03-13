import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, Col, Row, Tag } from 'antd';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ColumnPlot from './columnPlot';
import RankTable from './rankTable';
import AnalysisTable from '../components/table';
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
    const { startTime, endTime, indicator, platform, pagination } = props;
    props.getProductLine(startTime, endTime, indicator, platform);
    props.getTopTenProductNumbers(startTime, endTime, platform);
    props.getTopTenProductSales(startTime, endTime, platform);
    handlePageClick(pagination);
  }, [props.startTime, props.endTime, props.indicator, props.platform]);

  const handlePageClick = pagination => {
    const { startTime, endTime, platform } = props;
    props.changeTableLoading(true);
    props.getProductTable(startTime, endTime, platform, pagination);
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
          <IndicatorPicker />
        </Col>
        <Col span={8}>
          <PlatformsPicker />
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
          <AnalysisTable
            columns={columns}
            tableData={props.tableData}
            pagination={props.pagination}
            loading={props.loading}
            handlePageClick={handlePageClick}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {
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
    getProductLine(startTime, endTime, indicator, platform) {
      dispatch(
        productActionCreators.getProductLine(
          startTime,
          endTime,
          indicator,
          platform,
        ),
      );
    },
    getProductTable(startTime, endTime, platform, pagination) {
      dispatch(
        actionCreators.getProductTable(
          startTime,
          endTime,
          platform,
          pagination,
        ),
      );
    },
    changeTableLoading(loadingStatus) {
      dispatch(actionCreators.changeTableLoading(loadingStatus));
    },
    getTopTenProductSales(startTime, endTime, platform) {
      dispatch(
        productActionCreators.getTopTenProductSales(
          startTime,
          endTime,
          platform,
        ),
      );
    },
    getTopTenProductNumbers(startTime, endTime, platform) {
      dispatch(
        productActionCreators.getTopTenProductNumbers(
          startTime,
          endTime,
          platform,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByProduct);

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    sales: 32,
    percent: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    sales: 42,
    percent: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
  {
    key: '8',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
  {
    key: '9',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'Joe Black',
    sales: 32,
    percent: 'Sidney No. 1 Lake Park',
  },
];
