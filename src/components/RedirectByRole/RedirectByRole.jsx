import React from 'react';
import { checkUserRole } from 'store/userStore';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';

const RedirectByRole = () => {
  const isAdmin = useRecoilValue(checkUserRole('admin'))
  return <Navigate to={isAdmin ? 'admin/content' : 'login'} replace />
};

export default RedirectByRole;