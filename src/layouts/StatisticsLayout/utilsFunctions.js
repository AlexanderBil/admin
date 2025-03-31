import { useSetRecoilState } from 'recoil';
import { dailyStatisticDateState } from 'store/statisticsStore';
import _ from 'lodash';
import moment from 'moment';

export const createFinalStatisticData = (
  statisticArr,
  arr,
  seter,
  result,
  count
) => {
  if (statisticArr === arr) {
    seter((prev) => {
      return {
        ...prev,
        data: result,
        count: count,
      };
    });
  }
};

export const useSetDateToSetDateFrom = () => {
  const setDayFromDayToState = useSetRecoilState(dailyStatisticDateState);

  const setDateStateFrom = (data) => {
    const utcFrom = moment.utc(data).startOf('day').valueOf();
    setDayFromDayToState((prev) => {
      return {
        ...prev,
        dateFrom: utcFrom,
      };
    });
  };

  const setDateStateTo = (data) => {
    const utcTo = moment.utc(data).add(24, 'hours').endOf('day').valueOf();
    setDayFromDayToState((prev) => {
      return {
        ...prev,
        dateTo: utcTo,
      };
    });
  };

  return { setDateStateFrom, setDateStateTo };
};

export const createFilterDailyStatisticsData = (
  dealsData,
  setFilteredDealsData
) => {
  const finalArr = [];
  dealsData.data.map((item, index) => {
    const newArr = [];
    const objLicens = {};
    const objDepl = {};
    const Wai = {};
    const Nft = {};

    item.map((item2) => {
      if (item2.acquisition === 'Deployment') {
        objDepl.title = 'Deployment';
        objDepl[item2.classification] = item2.counter;
        newArr.push(objDepl);
      }

      if (item2.acquisition === 'License') {
        objLicens.title = 'License';
        objLicens[item2.classification] = item2.counter;
        newArr.push(objLicens);
      }

      if (item2.acquisition === 'WaiverOwnership') {
        Wai.title = 'WaiverOwnership';
        Wai[item2.classification] = item2.counter;
        newArr.push(Wai);
      }

      if (item2.acquisition === 'NFT') {
        Nft.title = 'NFT';
        Nft[item2.classification] = item2.counter;
        newArr.push(Nft);
      }
    });
    finalArr[index] = newArr;
  });

  setFilteredDealsData(
    finalArr.map((item) => {
      return _.uniqBy(item, 'title');
    })
  );
};

