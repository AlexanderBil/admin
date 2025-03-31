import axios from 'axios';

export default class InvitationService {
  getInvitationData(data) {
    return axios.post('marketplace/invitation/search/page', data);
  }

  getGlobalDetails() {
    return axios.get('marketplace/globalDetails');
  }
}

export const cancelInvitation = async (code, data) => {
  const result = await axios.post(
    `marketplace/invitation/${code}/cancel`,
    data
  );
  return result;
};

export const resumeInvitation = async (code, data) => {
  const result = await axios.post(
    `marketplace/invitation/${code}/resume`,
    data
  );
  return result;
};

export const resendNotification = async (code, data) => {
  const result = await axios.post(
    `marketplace/invitation/${code}/resendNotification`,
    data
  );
  return result;
};

export const getInfoObligations = async (data) => {
  const result = await axios.post('marketplace/mpInvitation/obligations', data);
  return result;
};
