import React, { Component } from 'react'
import { Table } from 'antd';
import { postTimeTable } from '../../../../../api';

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
  }
];

class AnalysisTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },
      loading: false,
    };
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    postTimeTable('2021-01-01', '2021-01-01', ["京东", "微信","天猫"], "月度", [], this.state.pagination.current, this.state.pagination.pageSize )
    .then(data => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.data.timeTable,
        pagination: {
          ...params.pagination,
          total: data.data.total,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={columns}
        rowKey={record => record.key}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default AnalysisTable