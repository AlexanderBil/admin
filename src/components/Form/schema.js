import * as yup from 'yup';

export const schema = yup.object().shape({
  algoAmount: yup
    .string()
    .test(
      'oneOfRequired',
      'One of the field, must be entered',
      (item, testContext) => {
        return testContext.parent.algoAmount || testContext.parent.assetAmount;
      }
    ),
  assetAmount: yup
    .string()
    .test(
      'oneOfRequired',
      'One of the field, must be entered',
      (item, testContext) => {
        return testContext.parent.algoAmount || testContext.parent.assetAmount;
      }
    ),
  comment: yup.string().required('Required field'),
});

export const schemaToRequiredComment = yup.object().shape({
  comment: yup.string().required('Required field'),
});

export const schemaToNft = yup.object().shape({
  email: yup.string().required('Required field'),
  dealTransactionId: yup.string().when('transferNft',{
    is: false,
    then: yup.string().required('Required field')
  }),
  comment: yup.string().required('Required field'),
});
