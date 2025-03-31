import { useSetRecoilState } from 'recoil';
import { dateFromDateToData } from 'store/usersSubmitionStore';
import moment from 'moment';

export const useSetDateToSetDateFrom = () => {
  const setDayFromDayToState = useSetRecoilState(dateFromDateToData);

  const setDateStateFrom = (data) => {
    const utcFrom = moment.utc(data).add(1, 'days').startOf('day').valueOf();
    setDayFromDayToState((prev) => {
      return {
        ...prev,
        from: utcFrom,
      };
    });
  };

  const setDateStateTo = (data) => {
    const utcTo = moment.utc(data).add(1, 'days').endOf('day').valueOf();
    setDayFromDayToState((prev) => {
      return {
        ...prev,
        to: utcTo,
      };
    });
  };

  return { setDateStateFrom, setDateStateTo };
};
