import { atom, selector } from 'recoil';
import { getExternalSourceList, getImportContentData, getStatusDetails } from 'services/importContentService';
import { findAccountImportContent } from 'services/importContentService';
import {getLocales} from 'services/importContentService';
import { PaginationData } from 'models';


export const fullUserSelectData = atom({
  key: 'fullUserSelectData',
  default: {},
});

export const portalEdicaseSelectData = atom({
  key: 'portalEdicaseSelectData',
  default: {
    value: '',
    isShowFilterList: false,
  },
});

export const filtersEmailImportContent = atom({
  key: 'filtersEmailImportContent',
  default: {
    keyword: '',
    isShowFilterList: false,
  },
});

export const importContentFiltersState = atom({
  key: 'importContentFiltersState',
  default: {
    page: 0,
    pageSize: 10,
  },
});

export const filterImportContentDetailsState = atom({
  key: 'filterImportContentDetailsState',
  default: {
    page: 0,
    pageSize: 10,
  },
});

export const detailsCode = atom({
  key: 'detailsCode',
  default: {
    code: '',
    optionsData: {}
  },
});


export const dateFromDateToImportContent = atom({
  key: 'dateFromDateToImportContent',
  default: {
    dateFrom: null,
    dateTo: null,
  },
});

export const sourceListState = selector({
  key: 'sourceListState',
  get: async ({ get }) => {
    try {
      const { data } = await getExternalSourceList();
      return {
        sourceList: data,
      };
    } catch (e) {
      throw e;
    }
  },
});


export const filteredImportContentAccount = selector({
  key: 'filteredImportContentAccount',
  get: async ({ get }) => {
    try {
      let filters = get(filtersEmailImportContent);
      const { data } = await findAccountImportContent(filters);
      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const localesData = selector({
  key: 'localesData',
  get: async () => {
    try {
      const { data } = await getLocales();
      return {
        localesList: data,
      };
    } catch (e) {
      throw e;
    }
  },
});


export const importContentState = selector({
  key: 'importContentState',
  get: async ({ get }) => {
    try {
      let filters = get(importContentFiltersState);
      let { dateFrom, dateTo } = get(dateFromDateToImportContent);
      const { data } = await getImportContentData(filters);
      if (dateFrom && dateTo) {
        let newFilters = {
          ...filters,
          dateRange: {
            from: dateFrom,
            to: dateTo
          }
        };
        const { data } = await getImportContentData(newFilters);
        return {
          userData: data[1],
          pagination: new PaginationData(data[0]),
        };
      }

      return {
        userData: data[1],
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const importContentDetailsState = selector({
  key: 'importContentDetailsState',
  get: async ({ get }) => {
    try {
      const filters = get(filterImportContentDetailsState);
      const { data } = await getStatusDetails(filters);
      return {
        detailsData: data[1],
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});