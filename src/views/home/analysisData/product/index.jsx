// import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Space, Divider, Col, Row, Tag } from 'antd';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import PlatformsPicker from '../components/platformsPicker';
import ColumnPlot from './columnPlot';
import RankTable from './rankTable';
import AnalysisTable from '../components/table'

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

const AnalysisByProduct = () => {
  return (
    <div
      style={{
        margin: '24px',
        backgroundColor: '#fff',
        padding: '24px',
      }}
    >
      <Space size={50} style={{ marginBottom: '20px' }}>
        <TimePicker />
        <IndicatorPicker />
        <PlatformsPicker />
      </Space>
      <Divider />
      <Row gutter={24} style={{ margin: '40px 0px' }}>
        <Col span={8}>
          <ColumnPlot />
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
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
