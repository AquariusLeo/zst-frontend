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

const columns1 = [
  {
    title: '排名',
    key: 'ranks',
    dataIndex: 'key',
    render: key => (
      <>
        {(key => {
          let color = Number(key) > 3 ? 'geekblue' : 'red';
          return (
            <Tag color={color} key={key}>
              {key}
            </Tag>
          );
        })(key)}
      </>
    ),
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '销售额',
    dataIndex: 'sales',
    key: 'sales',
  },
  {
    title: '占比',
    dataIndex: 'percent',
    key: 'percent',
  },
];

const columns2 = [
  {
    title: '排名',
    key: 'ranks',
    dataIndex: 'key',
    render: key => (
      <>
        {(key => {
          let color = Number(key) > 3 ? 'geekblue' : 'red';
          return (
            <Tag color={color} key={key}>
              {key}
            </Tag>
          );
        })(key)}
      </>
    ),
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '销售数量',
    dataIndex: 'numbers',
    key: 'numbers',
  },
  {
    title: '占比',
    dataIndex: 'percent',
    key: 'percent',
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
    const { startTime, endTime, indicator, platform } = props;
    props.getProductLine(startTime, endTime, indicator, platform);
  }, [props.startTime, props.endTime, props.indicator, props.platform]);

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
      <Row gutter={24} style={{ margin: '40px 0px' }}>
        <Col span={8}>
          <ColumnPlot productLine={props.productLine} columnPlotName={props.indicator}/>
        </Col>
        <Col span={8}>
          <RankTable columns={columns1} dataSource={dataSource} />
        </Col>
        <Col span={8}>
          <RankTable columns={columns2} dataSource={dataSource} />
        </Col>
      </Row>
      <AnalysisTable />
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
