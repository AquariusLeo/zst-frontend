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
  InputNumber,
  Modal,
} from 'antd';
import moment from 'moment';
import { Line, Pie, Column } from '@antv/g2plot';
import { debounce } from 'lodash';
import { getProducts, getAIPLLine, getAIPLPie, getAIPLColunm } from '@/api';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

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

  const [days, setDays] = useState(0);

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

  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const piePlot = new Pie('pie', {
      appendPadding: 10,
      data: pieData,
      angleField: 'sales',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'spider',
        content: ({ sales }) => {
          // console.log(value);
          return `${sales}人`;
        },
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      legend: {
        layout: 'vertical',
        position: 'bottom',
      },
      interactions: [{ type: 'element-active' }],
      color: ({type}) => {
        if (type === '已流失用户'){
          return '#E74C3C';
        };
        if (type === '未流失用户'){
          return '#2ECC71';
        };
        if (type === '流向价格更高产品'){
          return '#F4D03F';
        };
        if (type === '流向价格更低产品'){
          return '#3498DB';
        };
        return 'silver'
      },
    });

    piePlot.render();
    return () => {
      piePlot.destroy();
    };
  }, [pieData]);

  const [columnData, setColumnData] = useState([]);

  useEffect(() => {
    const columnPlot = new Column('column', {
      data: columnData,
      xField: 'name',
      yField: 'value',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoRotate: true,
        },
      },
      scrollbar: {
        type: 'horizontal',
      },
    });

    columnPlot.render();

    return () => {
      columnPlot.destroy();
    };
  }, [columnData]);

  async function onFinish() {
    Modal.warning({
      title: '注意：',
      content: '数据正在加载中，请勿操作！'
    });
    const product = value.map(item => item.key);
    const res = await getAIPLLine(product, times[0], times[1]);
    if (res && res.data && res.data.list) {
      setLineData(res.data.list);
    }
    const pie = await getAIPLPie(product, times[0], times[1], days);
    if (pie && pie.data && pie.data.pieData) {
      setPieData(pie.data.pieData);
    }
    const colunm = await getAIPLColunm(product, times[0], times[1], days);
    if (colunm && colunm.data && colunm.data.list) {
      setColumnData(colunm.data.list);
    }
    Modal.destroyAll();
    Modal.success({
      title: '提示：',
      content: '数据加载成功！'
    });
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

          <Col span={4}>
            <span
              style={{
                display: 'inline-block',
                width: '100px',
              }}
            >
              流失标准(天)：
            </span>
            <InputNumber onChange={value => setDays(value)} />
          </Col>

          <Col span={1}></Col>

          <Col span={3}>
            <Button onClick={onFinish} type="primary">
              查询
            </Button>
          </Col>

          <Col span={24}>
            <Descriptions title="销量变化趋势" />
            <div id="line"></div>
          </Col>

          <Col span={10}>
            <Descriptions title="用户流向" />
            <div id="pie"></div>
          </Col>

          <Col span={14}>
            <Descriptions title="流向产品分布">
              <Descriptions.Item>单位：人</Descriptions.Item>
            </Descriptions>
            <div id="column"></div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AIPL;
