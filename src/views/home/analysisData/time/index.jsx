import { Space } from 'antd';
import TimePicker from '../components/timePicker'
import IndicatorPicker from '../components/indicatorPicker'
import PlatformsPicker from '../components/platformsPicker'
import ProductsPicker from '../components/productsPicker'
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
        <ProductsPicker/>
      </Space>
      
      
    </div>
    
  )
}

export default AnalysisByTime
