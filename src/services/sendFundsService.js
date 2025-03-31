import axios from 'axios';

export default class SendFundsService {
  getSendFundsData(data) {
    return axios.post('marketplace/funds/distribution/search', data);
  }
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

export const sendFunds = async (data) => {
  const result = await axios.post('marketplace/funds/distribution', data);
  return result;
};
