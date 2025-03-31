import axios from 'axios';

export default class StatisticsService {
  getSummaryStatisticData() {
    return axios.get('marketplace/statistic/summary');
  }

  getDailyStatisticData({ dateFrom, dateTo }) {
    return axios.get(`marketplace/statistic/daily/${dateFrom}/${dateTo}`);
  }
}
