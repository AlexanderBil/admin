import DeploymentRequest from 'models/DeploymentRequest';
import PaginationData from 'models/PaginationData';
import { atom, selector } from 'recoil';
import DeploymentRequestService from 'services/deploymentRequestService';


const service = new DeploymentRequestService();

export const deploymentResponseData = atom({
  key: 'deploymentResponseData',
  default: {},
});

export const idInfo = atom({
  key: 'idInfo',
  default: {
    id: '',
    action: ''
  },
});

export const openModal = atom({
  key: 'openModal',
  default: {
    open: false,
  },
});

export const deploymentRequestFiltersState = atom({
  key: 'deploymentRequestFiltersState',
  default: {
    page: 0,
    pageSize: 10,
  },
});

export const dateFromDateToDeploymentState = atom({
  key: 'dateFromDateToDeploymentState',
  default: {
    from: null,
    to: null,
  },
});


export const deploymentRequestState = selector({
  key: 'deploymentRequestState',
  get: async ({ get }) => {
    try {
      let filters = get(deploymentRequestFiltersState);
      let { from, to } = get(dateFromDateToDeploymentState);
      const { data } = await service.getContentList(filters);
      if (from && to) {
        let newFilters = {
          ...filters,
          dateRange: {
            from,
            to,
          },
        };
        const { data } = await service.getContentList(newFilters);
        return {
          deploymentRequestData: data[1].map((item) => new DeploymentRequest(item)),
          pagination: new PaginationData(data[0]),
        };
      }

      return {
        deploymentRequestData: data[1].map((item) => new DeploymentRequest(item)),
        pagination: new PaginationData(data[0]),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const deploymentStatusesData = selector({
  key: 'deploymentStatusesData',
  get: async () => {
    try {
      const { data } = await service.deploymentRequestView();
      return {
        statuses: data,
      };
    } catch (e) {
      throw e;
    }
  },
});
