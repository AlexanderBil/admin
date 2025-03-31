import { atom, selector } from 'recoil';
import { Invitation, PaginationData } from 'models';
import InvitationService from 'services/invitationService';
import { getInfoObligations } from 'services/invitationService';

const service = new InvitationService();

export const invitationStatuses  = atom({
  key: 'invitationStatuses',
  default: {
    invitationStatus: ['Active']
  }
})

export const codeInfo = atom({
  key: 'codeInfo',
  default: {
    cancelCodeNumber: 0,
    resumeId: 0,
  },
});

export const isOpenModalState = atom({
  key: 'isOpenModalState',
  default: {
    open: false,
  },
});

export const isOpenModalCanselOrResume = atom ({
  key: 'isOpenModalCanselOrResume',
  default: {
    openModal: false,
  }
})

export const invitationFiltersState = atom({
  key: 'invitationFiltersState',
  default: {
    page: 0,
    pageSize: 10,
    keyword: '',
    createdByMe: false,
  },
});

export const globalDetails = selector({
  key: 'globalDetails',
  get: async ({ get }) => {
    try {
      const {data} = await service.getGlobalDetails()
      return data
    } catch (e) {
      throw e;
    }
  }
})

export const invitationState = selector({
  key: 'invitationState',
  get: async ({ get }) => {
    try {
      const filters = get(invitationFiltersState);
      const { data } = await service.getInvitationData(filters);
      return {
        invitation: data[1].map((item) => new Invitation(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const filteredInvitationState = selector({
  key: 'filteredInvitationState',
  get: ({ get }) => {
    const { cancelCodeNumber, resumeId } = get(codeInfo);
    const data = get(invitationState);
    const result = data.invitation.map((item) => {
      if (item.code === cancelCodeNumber) {
        return {
          ...item,
          status: 'Canceled',
          created: `${new Date(item.created).toLocaleString()}`,
        };
      }
      if (item.id === resumeId) {
        return {
          ...item,
          status: 'Active',
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


export const obligationState = selector({
  key: 'obligationState',
  get: async ({ get }) => {
    try {
      const status = get(invitationStatuses);
      const { data } = await getInfoObligations(status);
      return {
        data
      };
    } catch (e) {
      throw e;
    }
  },
});