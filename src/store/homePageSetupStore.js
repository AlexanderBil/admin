import { atom, selector } from 'recoil';
import HomePageSetupService from 'services/homePageSetupService';

const service = new HomePageSetupService();

export const lastEnteredData = atom({
  key: 'lastEnteredData',
  default: {
    editorialData: [],
    advertorialData: [],
  },
});

export const homePageResponseData = atom({
  key: 'homePageResponseData',
  default: {},
});

export const errorDataHome = atom({
  key: 'errorDataHome',
  default: {},
});

export const inputsData = atom({
  key: 'inputsData',
  default: {
    editorialLabel: '',
    advertorialLabel: '',
    setData: false,
    deleteDataE: false,
    deleteDataA: false,
    ed: [],
    ad: [],
  },
});

export const resData = atom({
  key: 'resData',
  default: {
    editorial: [],
    advertorial: [],
  },
});

export const editorialAndAdvertorialParams = atom({
  key: 'editorialAndAdvertorialParams',
  default: {
    locale: 'en',
    viewTypes: 'home_advertorial,home_editorial',
  },
});

export const getEditorialAndAdvertorialData = selector({
  key: 'getEditorialAndAdvertorialData',
  get: async ({ get }) => {
    try {
      const { locale, viewTypes } = get(editorialAndAdvertorialParams);
      const { data } = await service.getEditorialData(locale, viewTypes);

      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const getFilteredEditorialAndAdvertorialData = selector({
  key: 'getFilteredEditorialAndAdvertorialData',
  get: async ({ get }) => {
    try {
      const { data } = get(getEditorialAndAdvertorialData);
      const { editorial, advertorial } = get(resData);
      const { deleteDataE, deleteDataA } = get(inputsData);

      let editorialArr = data.viewConfig.home_editorial?.map((item) => item.contentId) || [];
      let advertorialArr = data.viewConfig.home_advertorial?.map((item) => item.contentId) || [];
      
      const res = {
        editorialLabel: deleteDataE ? [...editorial] : [...editorialArr, ...editorial],
        advertorialLabel: deleteDataA ? [...advertorial] : [...advertorialArr, ...advertorial],
      };

      return {
        res,
      };
    } catch (e) {
      throw e;
    }
  },
});
