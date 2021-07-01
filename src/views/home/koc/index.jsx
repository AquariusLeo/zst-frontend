import React, { useState } from 'react';
import { Select, Row, Col, Spin, Empty, Table, Button, DatePicker, message, Radio } from 'antd';
import { debounce } from 'lodash';
import { getProducts, koc } from '@/api';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;

const { RangePicker } = DatePicker;

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
  const [times, setTimes] = useState(['2020-01-01', '2021-01-01']);

  const handleTimeChange = value => {
    if (value !== null) {
      setTimes([
        moment(value[0]).format('YYYY-MM-DD'),
        moment(value[1]).format('YYYY-MM-DD'),
      ]);
    }
  };

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

  const [orders, setOrders] = useState(1);

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

  const [sortBy, setSortBy] = useState('sales');

  const handleSortByChange = value => {
    switch (value) {
      case 'sales':
        setSortBy('sales');
        break;
      case 'orders':
        setSortBy('orders');
        break;
      case 'items':
        setSortBy('items');
        break;
      case 'atv':
        setSortBy('atv');
        break;
      default:
        break;
    }
  };

  const [sortOrder, setSortOrder] = useState('desc');

  const handleSortOrderChange = e => {
    switch (e.target.value) {
      case 1:
        setSortOrder('asc');
        break;
      case 2:
        setSortOrder('desc');
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
    console.log(orders);
    const res = await koc(
      times[0],
      times[1],
      product,
      lowSales,
      highSales,
      orders,
      lowAtv,
      highAtv,
      sortBy,
      sortOrder,
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

  async function handleDownloadClick() {
    const product = value.map(item => item.key);
    const [lowSales, highSales] = [...sales];
    const [lowAtv, highAtv] = [...atv];
    const bodyObj = {
      startTime: times[0],
      endTime: times[1],
      product,
      lowSales,
      highSales,
      orders,
      lowAtv,
      highAtv,
      sortBy,
      sortOrder,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    };
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
      const response = await fetch('/api/downloadKocTable', request);
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
              时间范围：
            </span>
            <RangePicker
              locale={locale}
              style={{ width: '300px' }}
              onChange={handleTimeChange}
              defaultValue={[
                moment(times[0], 'YYYY-MM-DD'),
                moment(times[1], 'YYYY-MM-DD'),
              ]}
              format={'YYYY/MM/DD'}
            />
          </Col>

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

          <Col span={4}>
            <span
              style={{
                display: 'inline-block',
                width: '100px',
              }}
            >
              排序方式：
            </span>
            <Select
              defaultValue="sales"
              onChange={handleSortByChange}
            >
              <Option value="sales">消费金额</Option>
              <Option value="orders">消费频次</Option>
              <Option value="items">产品种类</Option>
              <Option value="atv">客单价</Option>
            </Select>
          </Col>

          <Col span={4}>
            <Radio.Group onChange={handleSortOrderChange} defaultValue={2}>
              <Radio.Button value={1}>升序</Radio.Button>
              <Radio.Button value={2}>降序</Radio.Button>
            </Radio.Group>          
          </Col>

          {/* <Col span={20}></Col> */}

          <Col span={2}>
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              onClick={onFinish} 
            >
              查询
            </Button>
          </Col>

          <Col span={2}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownloadClick}
            >
              下载
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
