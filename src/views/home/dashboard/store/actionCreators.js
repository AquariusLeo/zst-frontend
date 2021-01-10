import { INITINFOCARD, INITTREND } from './actionTypes'
import { getDashboardInfoCard, getDashboardTrend } from '@/api'

export const initInfoCardAction = (infoCardData) => ({
  type: INITINFOCARD,
  infoCardData
})

export const getInfoCard = (year, month) => {
  return async (dispatch) => {
    const infoCardData = await getDashboardInfoCard(year, month)
    if (infoCardData) {
      dispatch(initInfoCardAction(infoCardData.data))
    }
  }
}

export const initTrendAction = (trendData) => ({
  type: INITTREND,
  trendData
})

export const getTrend = (year) => {
  return async (dispatch) => {
    const trendData = await getDashboardTrend(year)
    if (trendData) {
      dispatch(initTrendAction(trendData.data.amountTrend))
    }
  }
}