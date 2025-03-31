import { useSetRecoilState } from 'recoil';
import { dateFromDateToImportContent } from 'store/importContentStore';
import moment from 'moment';

export const useSetDateToSetDateFrom = () => {
  const setDayFromDayToState = useSetRecoilState(dateFromDateToImportContent);

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
