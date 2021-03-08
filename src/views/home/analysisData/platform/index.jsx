import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Space } from 'antd';
import TimePicker from '../components/timePicker';
import IndicatorPicker from '../components/indicatorPicker';
import ProductsPicker from '../components/productsPicker';
import ColumnPlot from './columnPlot';
import AnalysisTable from '../components/table';

const AnalysisByPlatform = () => {
  return (
    <div
      style={{
        margin: '24px',
        backgroundColor: '#fff',
        padding: '24px',
      }}
    >
      <Space size={50} style={{ marginBottom: '20px' }}>
        <TimePicker />
        <ProductsPicker />
        <IndicatorPicker />
      </Space>
      <ColumnPlot style={{ marginBottom: '20px' }} />
      <AnalysisTable />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisByPlatform);
