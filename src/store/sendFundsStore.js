import { atom, selector } from 'recoil';
import SendFundsService from 'services/sendFundsService';
import { SendFunds, PaginationData } from 'models';
import { findAccount } from 'services/sendFundsService';

const service = new SendFundsService();

export const sendFundsResponseData = atom({
  key: 'sendFundsResponseData',
  default: {},
});

export const fullDataFromSelectEmail = atom({
  key: 'fullDataFromSelectEmail',
  default: {},
});

export const isOpenModal = atom({
  key: 'isOpenModal',
  default: {
    open: false,
  },
});

export const filtersByEmail = atom({
  key: 'filtersByEmail',
  default: {
    keyword: '',
    isShowFilterList: false,
  },
});

export const sendFundsFiltersState = atom({
  key: 'sendFundsFiltersState',
  default: {
    page: 0,
    pageSize: 10,
    keyword: '',
  },
});

export const dateFromDateToState = atom({
  key: 'dateFromDateToState',
  default: {
    dateFrom: null,
    dateTo: null,
  },
});

export const sendFundsState = selector({
  key: 'sendFundsState',
  get: async ({ get }) => {
    try {
      let filters = get(sendFundsFiltersState);
      let { dateFrom, dateTo } = get(dateFromDateToState);
      const { data } = await service.getSendFundsData(filters);
      if (dateFrom && dateTo) {
        let newFilters = {
          ...filters,
          dateFrom: dateFrom,
          dateTo: dateTo,
        };
        const { data } = await service.getSendFundsData(newFilters);
        return {
          funds: data[1].map((item) => new SendFunds(item)),
          pagination: new PaginationData(data[0]),
        };
      }

      return {
        funds: data[1].map((item) => new SendFunds(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const filteredSendFundsAccount = selector({
  key: 'filteredSendFundsAccount',
  get: async ({ get }) => {
    try {
      let filters = get(filtersByEmail);
      const { data } = await findAccount(filters);
      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});
