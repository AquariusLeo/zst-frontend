import React from 'react';
import { Select, Row, Col } from 'antd';

const { Option } = Select;

const KOCPage = () => {
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
            <Select>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default KOCPage;
