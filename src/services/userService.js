import axios from 'axios';

export default class UserService {
  login({ username, password }) {
    return axios.post('1ws/auth', { username, password, rememberMe: true })
  }
  logout() {
    return axios.get('1ws/logout?full=true')
  }
  getAccountData() {
    return axios.get('account')
  }

  async updateUserThumbnail(thumbnailData) {
    let bodyFormData = new FormData();
    bodyFormData.append('accountId', thumbnailData.accountId);
    bodyFormData.append('qquuid', thumbnailData.qquuid);
    bodyFormData.append('qqfilename', thumbnailData.qqfilename);
    bodyFormData.append('qqtotalfilesize', thumbnailData.qqtotalfilesize);
    bodyFormData.append('fileName', thumbnailData.fileName);

    try {
      const { data } = await axios({
        method: 'post',
        url: '/1ws/api/json/UploadAccountThumbnail',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: bodyFormData,
      });
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateUserData(userData) {
    const {
      first,
      last,
      email
    } = userData;
    try {
      const { data } = await axios({
        method: 'put',
        url: '/brands/me',
        data: {
          accountDto: {
            first,
            last,
            email
          }
        },
      });
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  changePassword(data){
    return axios.put('/account/password/change', data);
  }

}