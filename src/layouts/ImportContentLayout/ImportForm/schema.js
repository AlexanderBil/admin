import * as yup from 'yup';

export const schema = yup.object().shape({
  isValidAuthor: yup.string(),
  author: yup.string().when('$authorValue', (val, schema) => {
    if (typeof val === undefined) {
      return schema.required('Required field');
    } 
    return;
  }),
  sources: yup.string().required('Required field'),
  page: yup.number().typeError('page ≥ 1').moreThan(0, 'Enter amount > 0'),
  pageSize: yup
    .number()
    .typeError('')
    .min(1, 'Min value 1.')
    .max(20, 'Max value 20.'),
  price: yup
    .number()
    .typeError('')
    .moreThan(0, 'Enter amount > 0')
    .required('Required field'),
  currency: yup.string().required('Required field'),
  // currency: yup.string().when('price', {
  //   is: (price) => price !== undefined,
  //   then: yup.string().required('Select currency'),
  // }),
});

export const schemaSubsource = yup.object().shape({
  author: yup.string().when('$authorValue', (val, schema) => {

    if (val === undefined) {
      return yup.string().required('Required field');
    }
    return;
  }),
  sources: yup.string().required('Required field'),
  subsourceInput: yup.string().when('$value', (val, schema) => {
    if (val.length === 0) {
      return yup.string().required('Required field');
    }
    return ;
  }),
  page: yup.number().typeError('page ≥ 1').moreThan(0, 'Enter amount > 0'),
  pageSize: yup
    .number()
    .typeError('')
    .min(1, 'Min value 1.')
    .max(20, 'Max value 20.'),
  price: yup
    .number()
    .typeError('value ≥ 1')
    .moreThan(0, 'Enter amount > 0')
    .required('Required field'),
  currency: yup.string().required('Required field'),
  // currency: yup.string().when('price', {
  //   is: (price) => price !== undefined,
  //   then: yup.string().required('Select currency'),
  // }),
});
