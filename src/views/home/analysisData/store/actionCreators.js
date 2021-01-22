import { CHANGE_DATE, CLICK_INDICATORS, CLICK_PLATFORMS, SEARCH_PRODUCT, SELECT_PRODUCT, CHANGE_FETCH_STATUS } from './actionTypes'
import { getProducts } from '@/api'

export const changeDate = (times) => ({
  type: CHANGE_DATE,
  times
})

export const clickIndicators = (indicator) => ({
  type: CLICK_INDICATORS,
  indicator
})

export const clickPlatforms = (platform) => ({
  type: CLICK_PLATFORMS,
  platform
})

export const searchProduct = (str) => {
  return async (dispatch) => {
    const res = await getProducts(str)
    console.log(res)
    if (res) {
      dispatch({
        type: SEARCH_PRODUCT,
        searchData: res.data.products.map(value => ({value: value,key: value}))
      })
      dispatch(changeFetchStatus(false))
    }
  }
}

export const selectProduct = (list) => ({
  type: SELECT_PRODUCT,
  searchValue: list.map(item => ({key: item.key, value: item.value}))
})

export const changeFetchStatus = (fetchStatus) => ({
  type: CHANGE_FETCH_STATUS,
  fetching: fetchStatus
})