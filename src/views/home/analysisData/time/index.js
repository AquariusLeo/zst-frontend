import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;


const AnalysisByTime = () => {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker />
    </Space>
  )
}

export default AnalysisByTime
