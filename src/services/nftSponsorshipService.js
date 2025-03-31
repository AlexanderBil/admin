import axios from 'axios';

export default class NftSponsorshipService {
  getNftSponsorshipData(data) {
    return axios.post('marketplace/fiat_payment/content/search/page', data);
  }
}

export const getService = async () => {
  const result = await axios.get('marketplace/token/service');
  return result;
};

export const getSummary = async (data) => {
  const result = await axios.post('marketplace/fiat_payments/summary', data);
  return result;
};

export const getCollections = async () => {
  const result = await axios.post(
    'marketplace/collection/lastUpdated/20/?type=Sponsorship'
  );
  return result;
};

export const voidPayment = async (id, comment) => {
  const result = await axios.post(`marketplace/fiat_payment/${id}/void?comment=${comment}`)
  return result
}

export const completePayment = async (id, data) => {
  const result = await axios.post(`marketplace/fiat_payment/${id}/markAsDone`, data)
  return result
}



export const findAccount = async (filters) => {
  const result = await axios.get(
    `marketplace/account/all/profile/list?keyword=${filters.keyword}`,
    {
      params: {
        pageSize: 30,
      },
    }
  );
  return result;
};