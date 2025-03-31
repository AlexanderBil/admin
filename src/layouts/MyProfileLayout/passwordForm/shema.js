import * as yup from 'yup';

export const schema = yup.object().shape({
  currentPassword: yup.string().required('Required field'),
  newPassword: yup.string().required('Required field'),
  verifyNewPassword: yup
    .string()
    .required('Required field')
    .oneOf([yup.ref('newPassword')], 'Your passwords do not match.')
});
