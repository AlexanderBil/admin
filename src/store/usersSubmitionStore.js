import { atom, selector } from 'recoil';
import UsersSubmitionService from 'services/usersSubmitionService';
import { UsersSubmition, PaginationData } from 'models';

const service = new UsersSubmitionService();

export const usersSubmitionResponseData = atom({
  key: 'usersSubmitionResponseData',
  default: {},
});

export const idAndStatusInfo = atom({
  key: 'idAndStatusInfo',
  default: {
    userId: 0,
    userStatus: '',
    status: '',
    formTitleName: ''
  },
});

export const openModal = atom({
  key: 'openModal',
  default: {
    open: false,
  },
});

export const usersSubmitionFiltersState = atom({
  key: 'usersSubmitionFiltersState',
  default: {
    page: 0,
    pageSize: 10,
    sortField: 'created',
    sortOrder: 'desc',
    keyword: '',
  },
});

export const dateFromDateToData = atom({
  key: 'dateFromDateToData',
  default: {
    from: null,
    to: null,
  },
});

export const usersSubmitionState = selector({
  key: 'usersSubmitionState',
  get: async ({ get }) => {
    try {
      let filters = get(usersSubmitionFiltersState);
      let { from, to } = get(dateFromDateToData);
      const { data } = await service.getUsersSubmitionData(filters);
      if (from && to) {
        let newFilters = {
          ...filters,
          dateRange: {
            from,
            to,
          },
        };
        const { data } = await service.getUsersSubmitionData(newFilters);
        return {
          users: data[1].map((item) => new UsersSubmition(item)),
          pagination: new PaginationData(data[0]),
        };
      }

      return {
        users: data[1].map((item) => new UsersSubmition(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const filteredUsersSubmitionState = selector({
  key: 'filteredUsersSubmitionState',
  get: ({ get }) => {
    const responseData = get(usersSubmitionResponseData);
    const success = responseData.response?.status === 200;
    const { userId, status } = get(idAndStatusInfo);
    const { users } = get(usersSubmitionState);
    const filterUsers = users.map((item) => {
      if (item.id === userId && success) {
        return {
          ...item,
          status,
        };
      }
      return { ...item };
    });
    return filterUsers;
  },
});
