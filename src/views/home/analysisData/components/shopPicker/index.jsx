import { connect } from 'react-redux';
import { Select, Spin, Empty } from 'antd';
import { debounce } from 'lodash';
import { actionCreators } from '../../store';

const { Option } = Select;

const ShopsPicker = props => {
  return (
    <div style={{ width: '400px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '100px',
        }}
      >
        店铺：
      </span>
      <Select
        mode="multiple"
        labelInValue
        disabled={props.disabled}
        onClick={props.click}
        value={props.searchShopValue}
        placeholder="Select shops"
        notFoundContent={props.shopFetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={props.searchShop}
        onChange={props.selectShop}
        style={{ width: '300px' }}
      >
        {(() => {
          if (props.searchShopData.length === 0) {
            return (
              <Option disabled>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="没有找到相关的店铺"
                />
              </Option>
            );
          } else {
            return props.searchShopData.map(d => (
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
    searchShopValue: state.analysis.public.searchShopValue,
    searchShopData: state.analysis.public.searchShopData,
    shopFetching: state.analysis.public.shopFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchShop: debounce(value => {
      dispatch(actionCreators.changeShopFetchStatus(true));
      dispatch(actionCreators.searchShop(value));
    }, 800),
    selectShop(value) {
      dispatch(actionCreators.selectShop(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopsPicker);
