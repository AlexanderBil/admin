import axios from 'axios';

export function useAxios() {
  const $api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    timeout: 25000,
    credentials: 'same-origin',
  })

  const urls = {
    login: '1ws',
    check: 'account',

    participants: role => `marketplace/account/${role}/profile/list`
  }

  return {
    $api,
    urls
  }
}
