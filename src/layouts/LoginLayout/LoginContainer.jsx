import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import LoginForm from './LoginForm';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { checkUserRole } from 'store/userStore';
import useUserActions from 'hooks/useUserActions';

const LoginFormWrapper = withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: ''
  }),
  validationSchema: yup.object({
    username: yup.string().email().required('Field is required'),
    password: yup.string().min(6, 'Minimum password length is 6 symbols').required('Password is required')
  }),
  handleSubmit: async (values, { props: { onSubmit } }) => await onSubmit(values)
})(LoginForm)

const LoginContainer = () => {
  const { login } = useUserActions();
  const isAdmin = useRecoilValue(checkUserRole('admin'))

  return isAdmin ? <Navigate to="/admin/content" replace/> : <LoginFormWrapper onSubmit={login} />
};

export default LoginContainer;