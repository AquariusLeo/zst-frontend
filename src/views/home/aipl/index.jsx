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
          return `${sales}???`;
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
        if (type === '???????????????'){
          return '#E74C3C';
        };
        if (type === '???????????????'){
          return '#2ECC71';
        };
        if (type === '????????????????????????'){
          return '#F4D03F';
        };
        if (type === '????????????????????????'){
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
        // ??????????????? label ??????????????????
        position: 'middle', // 'top', 'bottom', 'middle',
        // ????????????
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
      title: '?????????',
      content: '???????????????????????????????????????'
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
      title: '?????????',
      content: '?????????????????????'
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
        ????????????
        <div style={{ fontSize: '16px' }}>
          ??????????????????????????????????????????????????????????????????????????????????????????
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
              ???????????????
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
              ?????????
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
                        description="???????????????????????????"
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
              ????????????(???)???
            </span>
            <InputNumber onChange={value => setDays(value)} />
          </Col>

          <Col span={1}></Col>

          <Col span={3}>
            <Button onClick={onFinish} type="primary">
              ??????
            </Button>
          </Col>

          <Col span={24}>
            <Descriptions title="??????????????????" />
            <div id="line"></div>
          </Col>

          <Col span={10}>
            <Descriptions title="????????????" />
            <div id="pie"></div>
          </Col>

          <Col span={14}>
            <Descriptions title="??????????????????">
              <Descriptions.Item>????????????</Descriptions.Item>
            </Descriptions>
            <div id="column"></div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AIPL;
