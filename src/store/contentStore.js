import { atom, selector } from 'recoil';
import { PaginationData, Content, ContentDetail } from 'models';
import ContentService from 'services/contentService';
import { Participant } from 'models';
import { findAccountContent } from 'services/contentService';

const service = new ContentService();

export const dataFromSelectEmailContent = atom({
  key: 'dataFromSelectEmailContent',
  default: {},
});

export const bulkPublicationState = atom({
  key: 'bulkPublicationState',
  default: [],
});

export const authorNameState = atom({
  key: 'authorNameState',
  default: {
    first: '',
    last: '',
  },
});

export const filtersByEmailContent = atom({
  key: 'filtersByEmailContent',
  default: {
    keyword: '',
    isShowFilterList: false,
  },
});

export const tabsState = atom({
  key: 'tabsState',
  default: { value: 0 },
});

export const isTilesState = atom({
  key: 'isTilesState',
  default: { value: true },
});

export const userNameState = atom({
  key: 'userNameState',
  default: {},
});

export const allUsersFiltersState = atom({
  key: 'allUsersFiltersState',
  default: { page: 0, pageSize: 10, keyword: '', role: 'all', subRole: '' },
});

export const contentFiltersState = atom({
  key: 'contentFiltersState',
  default: {
    page: 0,
    pageSize: 15,
    keyword: '',
    classifications: ['Article'],
    adOptions: [],
  },
});

export const localeState = atom({
  key: 'localeState',
  default: {
    locale: 'en',
  },
});

export const idNft = atom({
  key: 'idNft',
  default: {
    id: window.location.pathname.split('/')[3] || 0,
  },
});

export const contentState = selector({
  key: 'contentState',
  get: async ({ get }) => {
    try {
      const filters = get(contentFiltersState);
      const { locale } = get(localeState);
      const { data } = await service.getContentData(locale, filters);
      return {
        contentData: data[1].map((item) => new Content(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const topAccountState = selector({
  key: 'topAccountState',
  get: async ({ get }) => {
    try {
      const payloadData = {
        orderCriteria: 'ARTICLES',
        primaryRoles: ['mp_brand', 'mp_creator', 'mp_startup', 'mp_publisher'],
      };
      const { data } = await service.getTopAccount(payloadData);
      return {
        topAccountData: data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const detailsState = selector({
  key: 'detailsState',
  get: async ({ get }) => {
    try {
      const { id } = get(idNft);
      const { data } = await service.getDetailsData(id);
      return {
        detailsData: new ContentDetail(data),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const primaryLocaleState = selector({
  key: 'primaryLocaleState',
  get: ({ get }) => {
    const { detailsData } = get(detailsState);
    return detailsData.primaryLocale;
  },
});

export const contentLocalesState = selector({
  key: 'contentLocalesState',
  get: ({ get }) => {
    const { detailsData } = get(detailsState);
    return Object.keys(detailsData.contentLocales);
  },
});

export const allUsersState = selector({
  key: 'allUsersState',
  get: async ({ get }) => {
    try {
      const filters = get(allUsersFiltersState);
      const { data } = await service.getAllUsersList(filters);
      return {
        allUsers: data[1].map((item) => new Participant(item)),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const contentService = selector({
  key: 'contentService',
  get: async () => {
    try {
      const { data } = await service.getAllService();
      return {
        serviceData: data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const localesState = selector({
  key: 'localesState',
  get: async () => {
    try {
      const { data } = await service.getLocales();
      return {
        localesData: data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const filteredContentAccount = selector({
  key: 'filteredContentAccount',
  get: async ({ get }) => {
    try {
      let filters = get(filtersByEmailContent);
      const { data } = await findAccountContent(filters);
      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});
