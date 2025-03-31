import { useSetRecoilState } from 'recoil';
import { dateFromDateToInfo } from 'store/nftSponsorshipStore';
import moment from 'moment';

export const useSetDateToSetDateFrom = () => {
  const setDayFromDayToState = useSetRecoilState(dateFromDateToInfo);

  const setDateStateFrom = (data) => {
    const utcTo = moment.utc(data).add(1, 'days').startOf('day').valueOf();
    setDayFromDayToState((prev) => {
      return {
        ...prev,
        dateFrom: utcTo,
      };
    });
  };

  const setDateStateTo = (data) => {
    const utcTo = moment.utc(data).add(1, 'days').endOf('day').valueOf();
    setDayFromDayToState((prev) => {
      return {
        ...prev,
        dateTo: utcTo,
      };
    });
  };

  return { setDateStateFrom, setDateStateTo };
};
