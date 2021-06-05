import React, { useState } from 'react';
import { Select, Row, Col, Spin, Empty, Table, Button } from 'antd';
import { debounce } from 'lodash';
import { getProducts, koc } from '@/api';

const { Option } = Select;

const columns = [
  {
    title: '用户名',
    dataIndex: 'nickname',
  },
  {
    title: '消费金额/元',
    dataIndex: 'sales',
  },
  {
    title: '消费频次/月',
    dataIndex: 'orders',
  },
  {
    title: '产品种类',
    dataIndex: 'items',
  },
  {
    title: '客单价',
    dataIndex: 'atv',
  },
];

const KOCPage = () => {
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  const searchProduct = debounce(async value => {
    setFetching(true);
    const res = await getProducts(value);
    if (res && res.data && res.data.productList) {
      setData(
        res.data.productList.map(value => ({
          value: value,
          key: value,
        })),
      );
      setFetching(false);
    }
  });

  const selectProduct = value => {
    setValue(value.map(item => ({ key: item.key, value: item.value })));
  };

  const [sales, setSales] = useState([0, 100]);

  const handleSalesChange = value => {
    switch (value) {
      case '100':
        setSales([0, 100]);
        break;
      case '100-300':
        setSales([100, 300]);
        break;
      case '300-500':
        setSales([300, 500]);
        break;
      case '500-1000':
        setSales([500, 1000]);
        break;
      case '1000-2000':
        setSales([1000, 2000]);
        break;
      case '2000-5000':
        setSales([2000, 5000]);
        break;
      case '5000':
        setSales([5000, '']);
        break;
      default:
        break;
    }
  };

  const [orders, setOrders] = useState(0);

  const handleOrdersChange = value => {
    switch (value) {
      case '1':
        setOrders(1);
        break;
      case '3':
        setOrders(3);
        break;
      case '5':
        setOrders(5);
        break;
      case '10':
        setOrders(10);
        break;
      default:
        break;
    }
  };

  const [atv, setAtv] = useState([0, 100]);

  const handleAtvChange = value => {
    switch (value) {
      case '100':
        setAtv([0, 100]);
        break;
      case '100-300':
        setAtv([100, 300]);
        break;
      case '300-500':
        setAtv([300, 500]);
        break;
      case '500-1000':
        setAtv([500, 1000]);
        break;
      case '1000':
        setAtv([1000, '']);
        break;
      default:
        break;
    }
  };

  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  async function handleTableChange(pagination) {
    setLoading(true);
    const product = value.map(item => item.key);
    const [lowSales, highSales] = [...sales];
    const [lowAtv, highAtv] = [...atv];
    const res = await koc(
      product,
      lowSales,
      highSales,
      orders,
      lowAtv,
      highAtv,
      pagination.current,
      pagination.pageSize,
    );
    if (res) {
      setTableData(res.data.list.list);
      setPagination({
        ...pagination,
        total: res.data.list.total,
      });
      setLoading(false);
    }
  }

  async function onFinish() {
    handleTableChange(pagination);
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
        KOC
        <div style={{ fontSize: '16px' }}>关键意见消费者</div>
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
            <span
              style={{
                display: 'inline-block',
                width: '100px',
              }}
            >
              产品：
            </span>
            <Select
              mode="multiple"
              labelInValue
              value={value}
              placeholder="Select products"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={searchProduct}
              onChange={selectProduct}
              style={{ width: '300px' }}
            >
              {(() => {
                if (data.length === 0) {
                  return (
                    <Option disabled>
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="没有找到相关的产品"
                      />
                    </Option>
                  );
                } else {
                  return data.map(d => <Option key={d.key}>{d.value}</Option>);
                }
              })()}
            </Select>
          </Col>

          <Col span={8}>
            <span
              style={{
                display: 'inline-block',
                width: '100px',
              }}
            >
              消费金额：
            </span>
            <Select
              defaultValue="100"
              style={{ width: 300 }}
              onChange={handleSalesChange}
            >
              <Option value="100">100以下</Option>
              <Option value="100-300">100-300</Option>
              <Option value="300-500">300-500</Option>
              <Option value="500-1000">500-1000</Option>
              <Option value="1000-2000">1000-2000</Option>
              <Option value="2000-5000">2000-5000</Option>
              <Option value="5000">5000以上</Option>
            </Select>
          </Col>

          <Col span={8}>
            <span
              style={{
                display: 'inline-block',
                width: '100px',
              }}
            >
              消费频次：
            </span>
            <Select
              defaultValue="1"
              style={{ width: 300 }}
              onChange={handleOrdersChange}
            >
              <Option value="1">1次/月以上</Option>
              <Option value="3">3次/月以上</Option>
              <Option value="5">5次/月以上</Option>
              <Option value="10">10次/月以上</Option>
            </Select>
          </Col>

          <Col span={8}>
            <span
              style={{
                display: 'inline-block',
                width: '100px',
              }}
            >
              客单价：
            </span>
            <Select
              defaultValue="100"
              style={{ width: 300 }}
              onChange={handleAtvChange}
            >
              <Option value="100">100以下</Option>
              <Option value="100-300">100-300</Option>
              <Option value="300-500">300-500</Option>
              <Option value="500-1000">500-1000</Option>
              <Option value="1000">1000以上</Option>
            </Select>
          </Col>

          <Col span={8}>
            <Button onClick={onFinish} type="primary">
              查询
            </Button>
          </Col>

          <Col span={24}>
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={tableData}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            ></Table>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default KOCPage;
