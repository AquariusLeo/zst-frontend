import { Table } from 'antd';

const AnalysisTable = (props) => {
  const {columns, tableData, pagination, loading} = props
  return (
    <Table
        columns={columns}
        dataSource={tableData}
        pagination={pagination}
        loading={loading}
      />
  )
}

export default AnalysisTable