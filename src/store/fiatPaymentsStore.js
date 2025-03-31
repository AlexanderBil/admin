import { atom, selector } from 'recoil';
import FiatPaymentsService from 'services/fiatPaymentsService';
import { PaginationData } from 'models';
import FiatPayment from 'models/FiatPayments';

const service = new FiatPaymentsService();

export const fiatPaymentsFiltersState = atom({
  key: 'fiatPaymentsFiltersState',
  default: { page: 0, pageSize: 10 },
});

export const dateFromDateToPaymentState = atom({
  key: 'dateFromDateToPaymentState',
  default: {
    from: null,
    to: null,
  },
});

export const fiatPaymentsState = selector({
  key: 'fiatPaymentsState',
  get: async ({ get }) => {
    try {
      let filters = get(fiatPaymentsFiltersState);
      let { from, to } = get(dateFromDateToPaymentState);
      const { data } = await service.getPaymentsList(filters);
      if (from && to) {
        let newFilters = {
          ...filters,
          dateRange: {
            from,
            to,
          },
        };
        const { data } = await service.getPaymentsList(newFilters);
        return {
          payments: data[1].map((item) => new FiatPayment(item)),
          pagination: new PaginationData(data[0]),
        };
      }

      return {
        payments: data[1].map((item) => new FiatPayment(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});


export const paymentsData = selector({
  key: 'paymentsData',
  get: async () => {
    try {
      const { data } = await service.getPaymentsData();
      return {
        paymentsDataList: data,
      };
    } catch (e) {
      throw e;
    }
  },
});
