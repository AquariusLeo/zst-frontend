import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Col,
  Row,
  Space,
  message,
} from 'antd';
import moment from 'moment';
import { createGroup } from '@/api';

// const { Option } = Select;

function AddGroup({ addGroupFresh }) {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const [form] = Form.useForm();
  async function createGroupClick(values) {
    console.log('create group', values);
    const {
      name,
      describe,
      lowSumConsume,
      highSumConsume,
      lowAveragePrice,
      highAveragePrice,
      lowUp,
      highUp,
      lowOrderNumbers,
      highOrderNumbers,
      operator,
    } = values;
    const createTime = moment().format('YYYY-MM-DD');
    // console.log('createTime', createTime);
    const res = await createGroup(
      name,
      describe,
      lowSumConsume,
      highSumConsume,
      lowAveragePrice,
      highAveragePrice,
      lowUp,
      highUp,
      lowOrderNumbers,
      highOrderNumbers,
      createTime,
      operator,
    );

    if (res && res.data) {
      message.success('新建用户群成功！');
      form.resetFields();
      addGroupFresh();
    } else {
      message.error('新建用户群失败！');
    }
  }

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
                  message: '请输入用户群名称！',
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
                  message: '请输入用户群描述！',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={'总消费金额'} style={{ marginBottom: 0 }}>
              <Form.Item
                name="lowSumConsume"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入总消费金额下限！',
                  },
                ]}
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
                name="highSumConsume"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入总消费金额上限！',
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'每单平均金额'} style={{ marginBottom: 0 }}>
              <Form.Item
                name="lowAveragePrice"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入每单平均金额下限！',
                  },
                ]}
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
                name="highAveragePrice"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入每单平均金额上限！',
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'用户件单价'} style={{ marginBottom: 0 }}>
              <Form.Item
                name="lowUp"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入用户件单价下限！',
                  },
                ]}
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
                name="highUp"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入用户件单价上限！',
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'订单数'} style={{ marginBottom: 0 }}>
              <Form.Item
                name="lowOrderNumbers"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入订单数下限！',
                  },
                ]}
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
                name="highOrderNumbers"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                rules={[
                  {
                    required: true,
                    message: '请输入订单数上限！',
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>
          </Col>
          {/* <Col span={12}>
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
          </Col> */}

          <Col span={12}>
            <Form.Item
              label={'操作人'}
              name="operator"
              rules={[
                {
                  required: true,
                  message: '请输入操作人！',
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
                <Button type="primary" htmlType="submit">
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
