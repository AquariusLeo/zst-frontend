import React, { useState } from 'react';
import {
  Form,
  Input,
  message,
  InputNumber,
  Button,
  Select,
  Empty,
  Spin,
  Col,
  Row,
  Space,
} from 'antd';
import { createGroup } from '@/api';

const { Option } = Select;

function AddGroup() {
  const [fetching, changeFetchStatus] = useState(false);
  const [searchData, searchProduct] = useState([]);
  const [selectValue, selectProduct] = useState([]);
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const [form] = Form.useForm();
  const createGroupClick = values => {
    console.log('create group', values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form {...formItemLayout} form={form} onFinish={createGroupClick}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={'name'}
              label={'用户群名称'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={'describe'}
              label={'用户群描述'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={'总消费金额'} style={{ marginBottom: 0 }}>
              <Form.Item
                name='lowSumConsume'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name='highSumConsume'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'每单平均金额'} style={{ marginBottom: 0 }}>
              <Form.Item
                name='lowAveragePrice'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name='highAveragePrice'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'用户件单价'} style={{ marginBottom: 0 }}>
              <Form.Item
                name='lowUp'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name='highUp'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'订单数'} style={{ marginBottom: 0 }}>
              <Form.Item
                name='lowOrderNumbers'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name='highOrderNumbers'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'近30天消费金额'} style={{ marginBottom: 0 }}>
              <Form.Item
                name='lowRecentConsume'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name='highRecentConsume'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'近30天订单数'} style={{ marginBottom: 0 }}>
              <Form.Item
                name='lowRecentOrderNumbers'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  // lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name='highRecentOrderNumbers'
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'首单距今天数大于'} name='firstOrderTime'>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'尾单距今天数大于'} name='lastOrderTime'>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'最常购买商品'} name='recentProduct'>
              <Select
                mode='multiple'
                labelInValue
                placeholder='Select products'
              ></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'高频下单时间段'} name='time?'>
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={'操作人'}
              name='operator'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            span={12}
            style={{
              textAlign: 'right',
            }}
          >
            <Form.Item>
              <Space>
                <Button type='primary' htmlType='submit'>
                  新建
                </Button>
                <Button onClick={onReset}>reset</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AddGroup;
