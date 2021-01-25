import { Tabs } from 'antd';
import AnalysisByArea from './area'
import AnalysisByPlatform from './platform'
import AnalysisByProduct from './product'
import AnalysisByTime from './time'

const { TabPane } = Tabs;

function callback(key) {
  // console.log(key);
}

const Analysis = () => {
  return (
    <Tabs defaultActiveKey="1" onChange={callback} style={{
      margin: '24px',
      backgroundColor: '#fff',
      padding: '24px'
    }}>
      <TabPane tab="时间维度" key="1">
        <AnalysisByTime/>
      </TabPane>
      <TabPane tab="产品维度" key="2">
        <AnalysisByProduct/>
      </TabPane>
      <TabPane tab="地区维度" key="3">
        <AnalysisByArea/>
      </TabPane>
      <TabPane tab="平台维度" key="4">
        <AnalysisByPlatform/>
      </TabPane>
    </Tabs>
  )
}

export default Analysis