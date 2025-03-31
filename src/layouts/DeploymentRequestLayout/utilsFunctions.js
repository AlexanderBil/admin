import { useSetRecoilState } from 'recoil';
import { dateFromDateToDeploymentState } from 'store/deploymentRequestStore';
import moment from 'moment';

export const useSetDateToSetDateFrom = () => {
  const setDayFromDayToState = useSetRecoilState(dateFromDateToDeploymentState);

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
