import { atom, selectorFamily } from 'recoil';
import User from 'models/User';

export const userDataState = atom({
  key: 'userDataState',
  default: new User()
})
export const checkUserRole = selectorFamily({
  key: 'checkUserRole',
  get: role => ({ get }) => get(userDataState).roles.includes(role)
})