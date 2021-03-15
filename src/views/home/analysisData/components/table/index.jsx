import { Table } from 'antd';

const AnalysisTable = props => {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     data: [],
  //     pagination: {
  //       current: 1,
  //       pageSize: 10,
  //     },
  //     loading: false,
  //   };
  // }

  // useEffect(() => {
  //   const { pagination } = props
  //   request({ pagination });
  // }, [])

  const handleTableChange = pagination => {
    // request({
    //   pagination,
    // });
    // console.log(props.loading);
    props.handlePageClick(pagination);
  };

  // const request = (params = {}) => {
  //   // this.setState({ loading: true });
  //   postTimeTable('2021-01-01', '2021-01-01', ["京东", "微信","天猫"], "月度", [], this.state.pagination.current, this.state.pagination.pageSize )
  //   .then(data => {
  //     console.log(data);
  //     this.setState({
  //       loading: false,
  //       data: data.data.timeTable,
  //       pagination: {
  //         ...params.pagination,
  //         total: data.data.total,
  //         // 200 is mock data, you should read it from server
  //         // total: data.totalCount,
  //       },
  //     });
  //   });
  // };

  return (
    <Table
      columns={props.columns}
      rowKey={record => record.id}
      dataSource={props.tableData}
      pagination={props.pagination}
      loading={props.loading}
      onChange={handleTableChange}
    />
  );
};

export default AnalysisTable;
