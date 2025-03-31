import axios from 'axios';

export default class AccessRequestService {
  getAccessRequestData(data) {
    return axios.post('marketplace/accessRequest/search/page', data);
  }
}

export const accessRequestComplete = async (id, data) => {
  const result = await axios.post(`marketplace/accessRequest/${id}/complete`, data)
  return result
}

export const accessRequestCancel = async (id, data) => {
  const result = await axios.post(`marketplace/accessRequest/${id}/cancel`, data)
  return result
}

export const sendInvitetion = async (data) => {
  const result = await axios.post('marketplace/invitation', data)
  return result
}

export const getIncentiveDetails = () => {
  return axios.get('marketplace/token/main')
}

export const getIncentiveAmount = () => {
  return axios.get('marketplace/incentiveDetails')
}