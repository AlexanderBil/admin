import { atom, selector } from 'recoil';
import NftSponsorshipService from 'services/nftSponsorshipService';
import { NftSponsorship, PaginationData } from 'models';
import { findAccount } from 'services/nftSponsorshipService';
import {
  getService,
  getSummary,
  getCollections,
} from 'services/nftSponsorshipService';

const service = new NftSponsorshipService();

export const fullDataFromUser = atom({
  key: 'fullDataFromUser',
  default: {},
});

export const filterByEmail = atom({
  key: 'filterByEmail',
  default: {
    keyword: '',
    isShowFilterList: false,
  },
});

export const nftResponseData = atom({
  key: 'nftResponseData',
  default: {},
});

export const openNftModal = atom({
  key: 'openNftModal',
  default: {
    open: false,
  },
});

export const contentIdAndStatusInfo = atom({
  key: 'contentIdAndStatusInfo',
  default: {
    id: 0,
    status: '',
    formTitle: '',
    isVoidForm: false
  },
});

export const nftSponsorshipFiltersState = atom({
  key: 'nftSponsorshipFiltersState',
  default: {
    page: 0,
    pageSize: 10,
    keyword: '',
  },
});

export const dateFromDateToInfo = atom({
  key: 'dateFromDateToInfo',
  default: {
    dateFrom: null,
    dateTo: null,
  },
});

export const nftSponsorshipService = selector({
  key: 'nftSponsorshipService',
  get: async () => {
    try {
      const { data } = await getService();
      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const nftCollectionState = selector({
  key: 'nftCollectionState',
  get: async () => {
    try {
      const { data } = await getCollections();
      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const nftSponsorshipState = selector({
  key: 'nftSponsorshipState',
  get: async ({ get }) => {
    try {
      const filters = get(nftSponsorshipFiltersState);
      const { dateFrom, dateTo } = get(dateFromDateToInfo);
      const { data } = await service.getNftSponsorshipData(filters);
      if (dateFrom && dateTo) {
        let newFilters = {
          ...filters,
          dateFrom: dateFrom,
          dateTo: dateTo,
        };
        const { data } = await service.getNftSponsorshipData(newFilters);
        return {
          sponsorship: data[1].map((item) => new NftSponsorship(item)),
          pagination: new PaginationData(data[0]),
        };
      }

      return {
        sponsorship: data[1].map((item) => new NftSponsorship(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});


export const nftSummaryState = selector({
  key: 'nftSummaryState',
  get: async ({ get }) => {
    try {
      const filters = get(nftSponsorshipFiltersState);

      const { dateFrom, dateTo } = get(dateFromDateToInfo);
      const { data } = await getSummary(filters);
      if (dateFrom && dateTo) {
        let newFilters = {
          ...filters,
          dateFrom: dateFrom,
          dateTo: dateTo,
        };
        const { data } = await getSummary(newFilters);
        return {
          totalPayments: data.totalPayments,
        };
      }
      return {
        totalPayments: data.totalPayments,
      };
    } catch (e) {
      throw e;
    }
  },
});


export const filteredNftSponsorshipState = selector({
  key: 'filteredNftSponsorshipState',
  get: ({ get }) => {
    const responseData = get(nftResponseData);
    const success = responseData.response?.status === 200;
    const { id, status } = get(contentIdAndStatusInfo);
    const { sponsorship } = get(nftSponsorshipState);
    const filterSponsorship = sponsorship.map((item) => {
      if (item.id === id && success) {
        return {
          ...item,
          status,
        };
      }
      return { ...item };
    });
    return filterSponsorship;
  },
});


export const filteredNftAccount = selector({
  key: 'filteredNftAccount',
  get: async ({ get }) => {
    try {
      let filters = get(filterByEmail);
      const { data } = await findAccount(filters);
      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});
