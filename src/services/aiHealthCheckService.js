import axios from 'axios';

export default class AiHealthCheckService {
  getMetrics(id) {
    return axios.get(`marketplace/ai/content/${id}/health-check/metrics`)
  }
}

export const scanAi = async (id) => {
  return await axios.put(`marketplace/ai/content/${id}/admin_metrics?aiCategory=HealthCheck`);
};
