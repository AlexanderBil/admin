import axios from 'axios';

export default class HomePageSetupService {
  setEditorialAndAdvertorialId(data) {
    return axios.post('marketplace/content/view/config', data);
  }

  getEditorialData(locale, viewTypes) {
    return axios.get(
      `marketplace/content/view/${locale}/config?viewTypes=${viewTypes}`
    );
  }

  deleteEditorialAndAdvertorialId(data) {
    return axios.delete('marketplace/content/view/config', { data })
  }
}
