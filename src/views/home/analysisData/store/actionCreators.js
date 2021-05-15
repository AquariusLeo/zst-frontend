import {
  CHANGE_DATE,
  CLICK_INDICATORS,
  CLICK_PLATFORMS,
  SEARCH_PRODUCT,
  SELECT_PRODUCT,
  CHANGE_FETCH_STATUS,
  SEARCH_SHOP,
  SELECT_SHOP,
  CHANGE_SHOP_FETCH_STATUS,
  CLICK_TIME_LEVEL,
  INITPICKER,
  GET_TIME_TABLE,
  GET_PLATFORM_TABLE,
  GET_PRODUCT_TABLE,
  GET_PROVINCE_TABLE,
  CHANGE_TABLE_LOADING,
} from './actionTypes';
import {
  getProducts,
  postTimeTable,
  postPlatformTable,
  postProductTable,
  postProvinceTable,
  shopSearch,
} from '@/api';

export const initPicker = times => ({
  type: INITPICKER,
  times,
  indicator: '销售总金额',
  platform: ['天猫', '京东', '微信'],
  timeLevel: '月度',
  fetching: false,
  searchValue: [],
  searchData: [],
  shopFetching: false,
  searchShopValue: [],
  searchShopData: [],
  tableData: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  loading: false,
});

export const changeDate = times => ({
  type: CHANGE_DATE,
  times,
});

export const clickIndicators = indicator => ({
  type: CLICK_INDICATORS,
  indicator,
});

export const clickPlatforms = platform => ({
  type: CLICK_PLATFORMS,
  platform,
});


export const searchProduct = str => {
  return async dispatch => {
    const res = await getProducts(str);
    // console.log(res);
    if (res) {
      dispatch({
        type: SEARCH_PRODUCT,
        searchData: res.data.productList.map(value => ({
          value: value,
          key: value,
        })),
      });
      dispatch(changeFetchStatus(false));
    }
  };
};

export const selectProduct = list => ({
  type: SELECT_PRODUCT,
  searchValue: list.map(item => ({ key: item.key, value: item.value })),
});

export const changeFetchStatus = fetchStatus => ({
  type: CHANGE_FETCH_STATUS,
  fetching: fetchStatus,
});

export const searchShop = str => {
  return async dispatch => {
    const res = await shopSearch(str)
    if (res) {
      dispatch({
        type: SEARCH_SHOP,
        searchShopData: res.data.shopList.map(value => ({
          value: value,
          key: value
        }))
      })
    }
  }
}

export const selectShop = list => ({
  type: SELECT_SHOP,
  searchShopValue: list.map(item => ({ key: item.key, value: item.value })),
})

export const changeShopFetchStatus = fetchStatus => ({
  type: CHANGE_SHOP_FETCH_STATUS,
  shopFetching: fetchStatus,
})

export const clickTimeLevel = level => ({
  type: CLICK_TIME_LEVEL,
  level,
});

export const changeTableLoading = loadingStatus => ({
  type: CHANGE_TABLE_LOADING,
  loading: loadingStatus,
});

export const getTimeTable = (
  startTime,
  endTime,
  platform,
  timeLevel,
  product,
  pagination,
  shop
) => {
  return async dispatch => {
    // console.log(startTime, endTime, platform, timeLevel, product, pagination);
    const res = await postTimeTable(
      startTime,
      endTime,
      platform,
      timeLevel,
      product,
      pagination.current,
      pagination.pageSize,
      shop
    );
    // console.log(res);
    if (res) {
      // console.log(startTime, endTime, platform, timeLevel, product, pagination);
      // console.log(res.data);
      // console.log('list', res.data.list.endRow === 0);
      dispatch({
        type: GET_TIME_TABLE,
        tableData: res.data.list.list,
        pagination: {
          ...pagination,
          total: res.data.list.total,
        },
        loading: false,
      });
    }
  };
};

export const getPlatformTable = (startTime, endTime, product, pagination) => {
  return async dispatch => {
    const res = await postPlatformTable(
      startTime,
      endTime,
      product,
      pagination.current,
      pagination.pageSize,
    );
    // console.log('res', res);
    if (res) {
      dispatch({
        type: GET_PLATFORM_TABLE,
        tableData: res.data.list.list,
        pagination: {
          ...pagination,
          total: res.data.list.total,
        },
        loading: false,
      });
    }
  };
};

export const getProductTable = (startTime, endTime, platform, pagination, shop) => {
  return async dispatch => {
    const res = await postProductTable(
      startTime,
      endTime,
      platform,
      pagination.current,
      pagination.pageSize,
      shop
    );
    // console.log('res', res);
    if (res) {
      dispatch({
        type: GET_PRODUCT_TABLE,
        tableData: res.data.list.list,
        pagination: {
          ...pagination,
          total: res.data.list.total,
        },
        loading: false,
      });
    }
  };
};

export const getProvinceTable = (
  startTime,
  endTime,
  platform,
  product,
  pagination,
  shop,
) => {
  return async dispatch => {
    const res = await postProvinceTable(
      startTime,
      endTime,
      platform,
      product,
      pagination.current,
      pagination.pageSize,
      shop,
    );
    if (res) {
      dispatch({
        type: GET_PROVINCE_TABLE,
        tableData: res.data.list.list,
        pagination: {
          ...pagination,
          total: res.data.list.total,
        },
        loading: false,
      });
    }
  };
};
