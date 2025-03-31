import * as yup from 'yup';

export const schema = yup.object().shape({
  details: yup
    .string()
    .required('required field')
    .max(500, 'limited to 500 characters'),
});
