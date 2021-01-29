import { Space, Button } from 'antd';
import TimePicker from '../components/timePicker'
import IndicatorPicker from '../components/indicatorPicker'
import PlatformsPicker from '../components/platformsPicker'
import ProductsPicker from '../components/productsPicker'
import TimeLevelPicker from '../components/timeLevelPicker'
import TimeLine from './line'
import './style.scss'

const AnalysisByTime = () => {
 
  return (
    <div className="analysis-by-time-container">
      <Space direction="vertical">
        <Space size={50}>
          <TimePicker/>
          <IndicatorPicker/>
          <PlatformsPicker/>
        </Space>
        <Space size={50}>
          <ProductsPicker/>
          <TimeLevelPicker/>
          <Button type="primary" style={{width: '100px'}}>查询</Button>
        </Space>
      </Space>
      <TimeLine></TimeLine>
      
    </div>
    
  )
}

export default AnalysisByTime
