import { useRecoilValue } from 'recoil';
import { getDefaultData } from 'store/accessRequestStore';

export const useIncentivesDataHandler = () => {

const defaultData = useRecoilValue(getDefaultData);

  const role = defaultData.role && defaultData.role.split('_')[1];

  if (defaultData.incentiveAmountData.limitOnInvitation[role]?.active === true) {
    return [
      defaultData.incentiveAmountData.limitOnInvitation[role].algoAmount,
      defaultData.incentiveAmountData.limitOnInvitation[role].assetAmount,
    ];
  } else {
    return [
      defaultData.incentiveAmountData.limitOnInvitation.creator.algoAmount,
      defaultData.incentiveAmountData.limitOnInvitation.creator.assetAmount,
    ]
  }
};
