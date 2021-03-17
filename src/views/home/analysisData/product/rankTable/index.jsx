import React from 'react'
import { Table } from 'antd';

// const columns = [
//   {
//     title: '排名',
//     key: 'ranks',
//     dataIndex: 'key',
//     render: key => (
//       <>
//         {(key => {
//           let color = Number(key) > 3 ? 'geekblue' : 'red';
//           return (
//             <Tag color={color} key={key}>
//               {key}
//             </Tag>
//           );
//         })(key)}
//       </>
//     ),
//   },
//   {
//     title: '商品名称',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: '销售额',
//     dataIndex: 'sales',
//     key: 'sales',
//   },
//   {
//     title: '占比',
//     dataIndex: 'percent',
//     key: 'percent',
//   },
// ];
const RankTable = props => {
  return (
    <div>
      <div style={{ fontSize: '20px', marginBottom: '28px' }}>{props.name}</div>
      <Table
        columns={props.columns}
        rowKey={record => record.id}
        dataSource={props.dataSource}
        pagination={false}
      />
    </div>
  );
};

export default React.memo(RankTable);

// const data = [
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
