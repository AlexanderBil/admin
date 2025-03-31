import axios from 'axios';
import cleanObject from 'utils/cleanObject';

export default class ParticipantsService {
  getParticipantsList({ page, pageSize, keyword, role, subRole: subRoleId }) {
    return axios.get(
      `marketplace/account/${role}/profile/list`,
      { params: cleanObject({ page, pageSize, keyword, subRoleId }) }
    )
  }

  getBalance({ id }){
    return axios.get(
      `marketplace/account/profile/${id}/balance`
    )
  }
}