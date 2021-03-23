import { connect } from 'react-redux';
import { Select, Spin, Empty } from 'antd';
import { debounce } from 'lodash';
import { actionCreators } from '../../store';

const { Option } = Select;

const ProductsPicker = props => {
  return (
    <div style={{ width: '400px' }}>
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
        value={props.searchValue}
        placeholder="Select products"
        notFoundContent={props.fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={props.searchProduct}
        onChange={props.selectProduct}
        style={{ width: '300px' }}
      >
        {(() => {
          if (props.searchData.length === 0) {
            return (
              <Option disabled>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="没有找到相关的产品"
                />
              </Option>
            );
          } else {
            return props.searchData.map(d => (
              <Option key={d.key}>{d.value}</Option>
            ));
          }
        })()}
      </Select>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchValue: state.analysis.public.searchValue,
    searchData: state.analysis.public.searchData,
    fetching: state.analysis.public.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchProduct: debounce(value => {
      dispatch(actionCreators.changeFetchStatus(true));
      dispatch(actionCreators.searchProduct(value));
    }, 800),
    selectProduct(value) {
      dispatch(actionCreators.selectProduct(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPicker);
