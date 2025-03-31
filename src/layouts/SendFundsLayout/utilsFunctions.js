import { useSetRecoilState } from 'recoil';
import { dateFromDateToState } from 'store/sendFundsStore';
import moment from 'moment';

export const useSetDateToSetDateFrom = () => {
  const setDayFromDayToState = useSetRecoilState(dateFromDateToState);

  const setDateStateFrom = (data) => {
    const utcFrom = moment.utc(data).add(1, 'days').startOf('day').valueOf();
    setDayFromDayToState((prev) => {
      return {
        ...prev,
        dateFrom: utcFrom,
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
