import { INITINFOCARD } from './actionTypes'
import { getDashboardInfoCard } from '@/api'

export const initInfoCardAction = (infoCardData) => ({
  type: INITINFOCARD,
  infoCardData
})

export const getInfoCard = (year, month) => {
  return async (dispatch) => {
    const infoCardData = await getDashboardInfoCard(year, month)
    console.log(infoCardData)
    dispatch(initInfoCardAction(infoCardData.data))
  }
}