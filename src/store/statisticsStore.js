import { atom, selector } from 'recoil';
import StatisticsService from 'services/statisticsService';
import { SummaryStatistic } from 'models';
import { DailyStatistic } from 'models';
import moment from 'moment';

const service = new StatisticsService();

const dayStart = moment().subtract(5, 'days').format();
const dayEnd = moment().subtract(1, 'days').format();

export const dayFromUtc = moment.utc(dayStart).startOf('day').valueOf();
export const dayToUtc = moment.utc(dayEnd).endOf('day').valueOf();


export const dailyStatisticDateState = atom({
  key: 'dailyStatisticDateState',
  default: {
    dateFrom: dayFromUtc,
    dateTo: dayToUtc,
  },
});

export const summaryStatisticState = selector({
  key: 'summaryStatisticState',
  get: async () => {
    try {
      const { data } = await service.getSummaryStatisticData();
      return {
        summaryStatistic: new SummaryStatistic(data),
      };
    } catch (e) {
      throw e;
    }
  },
});

export const dailyStatisticState = selector({
  key: 'dailyStatisticState',
  get: async ({ get }) => {
    try {
      const dayFilters = get(dailyStatisticDateState);
      const { data } = await service.getDailyStatisticData(dayFilters);
      return {
        dailyStatistic: new DailyStatistic(data),
      };
    } catch (e) {
      return {
        dailyStatistic: new DailyStatistic(),
      };
    }
  },
});
