import { selector } from 'recoil';
import { idNft } from 'store/contentStore';
import AiHealthCheckService from 'services/aiHealthCheckService';

const service = new AiHealthCheckService()

export const metrics = selector({
  key: 'metricsState',
  get: async ({ get }) => {
    try {
      const { id } = get(idNft);
      const { data } = await service.getMetrics(id);
      return data;
    } catch (e) {
      throw e;
    }
  },
});
