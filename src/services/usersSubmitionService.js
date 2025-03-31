import axios from 'axios';

export default class UsersSubmitionService {
  getUsersSubmitionData(data) {
    return axios.post('marketplace/submit/resource/list/page', data);
  }
}

export const cancelOrApproveUsersSubmition = async (id, data) => {
  const result = await axios.put(
    `marketplace/submit/resource/process/${id}`, data);
  return result;
};
