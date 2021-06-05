import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  DatePicker,
  Select,
  Spin,
  Empty,
  Button,
  Descriptions,
} from 'antd';
import moment from 'moment';
import { Line } from '@antv/g2plot';
import { debounce } from 'lodash';
import { getProducts, getAIPLLine } from '@/api';

const { Option } = Select;

const { RangePicker } = DatePicker;

const AIPL = () => {
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

  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const line = new Line('line', {
      data: lineData,
      padding: 'auto',
      xField: 'date',
      yField: 'value',
    });

    line.render();

    return () => {
      line.destroy();
    };
  }, [lineData]);

  async function onFinish() {
    const product = value.map(item => item.key);
    const res = await getAIPLLine(product, times[0], times[1]);
    if (res && res.data && res.data.list) {
      setLineData(res.data.list);
    }
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
        用户流转
        <div style={{ fontSize: '16px' }}>
          自定义时间内，选择某一产品，可以看到所购买用户及近期购买轨迹
        </div>
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
            <Button onClick={onFinish} type="primary">
              查询
            </Button>
          </Col>

          <Col span={24}>
            <Descriptions title="购买记录" />
            <div id="line"></div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AIPL;
