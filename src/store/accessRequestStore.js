import { atom, selector } from 'recoil';
import { AccessRequest, PaginationData } from 'models';
import AccessRequestService from 'services/accessRequestService';
import { getIncentiveDetails } from 'services/accessRequestService';
import { getIncentiveAmount } from 'services/accessRequestService';

const service = new AccessRequestService();

export const subRoleToogle = atom({
  key: 'subRoleToogle',
  default: '',
});

export const isOpenModalCanselOrComplete = atom ({
  key: 'isOpenModalCanselOrComplete',
  default: {
    openModal: false,
  }
})

export const invitationResponseData = atom({
  key: 'invitationResponseData',
  default: {},
});

export const idState = atom({
  key: 'idState',
  default: {
    idCancel: 0,
    idComplete: 0,
    idInvitetion: 0,
  },
});

export const accessRequestFiltersState = atom({
  key: 'accessRequestFiltersState',
  default: {
    page: 0,
    pageSize: 10,
    keyword: '',
  },
});

export const accessRequestState = selector({
  key: 'accessRequestState',
  get: async ({ get }) => {
    try {
      const filters = get(accessRequestFiltersState);
      const { data } = await service.getAccessRequestData(filters);
      return {
        accessRequest: data[1].map((item) => new AccessRequest(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const filteredAccessRequestState = selector({
  key: 'filteredAccessRequestState',
  get: ({ get }) => {
    const { idCancel } = get(idState);
    const { idComplete } = get(idState);
    const data = get(accessRequestState);
    const result = data.accessRequest.map((item) => {
      if (item.id === idCancel) {
        return {
          ...item,
          status: 'Canceled',
          created: `${new Date(item.created).toLocaleString()}`,
        };
      }
      if (item.id === idComplete) {
        return {
          ...item,
          status: 'Done',
          created: `${new Date(item.created).toLocaleString()}`,
        };
      } else {
        return {
          ...item,
          created: `${new Date(item.created).toLocaleString()}`,
        };
      }
    });
    return result;
  },
});

export const getDefaultData = selector({
  key: 'getDefaultData',
  get: ({ get }) => {
    const { idInvitetion } = get(idState);
    const data = get(accessRequestState);
    const { amount } = get(getIncentiveAmountData);
    const incentiveDetailsData = get(getIncentiveDetailsData);
    let obj = {};
    data.accessRequest.map((item) => {
      if (item.id === idInvitetion) {
        obj = {
          email: item.email,
          role: item.role,
          subRole: item.subRole,
          incentiveAmountData: amount.data,
          incentiveDetailsData: incentiveDetailsData.data,
        };
      }
      if (!idInvitetion) {
        obj = {
          email: '',
          role: 'mp_creator',
          subRole: '',
          incentiveAmountData: amount.data,
          incentiveDetailsData: incentiveDetailsData.data,
        };
      }
    });
    return obj;
  },
});

export const getIncentiveDetailsData = selector({
  key: 'getIncentiveDetailsData',
  get: async () => {
    try {
      const { data } = await getIncentiveDetails();
      return {
        data,
      };
    } catch (e) {
      throw e;
    }
  },
});

export const getIncentiveAmountData = selector({
  key: 'getIncentiveAmountData',
  get: async () => {
    try {
      const amount = await getIncentiveAmount();
      return {
        amount,
      };
    } catch (e) {
      throw e;
    }
  },
});
