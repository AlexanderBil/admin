import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CenteredLoader from 'components/CenteredLoader';
import useUserActions from 'hooks/useUserActions';
import { useRecoilValue } from 'recoil';
import { checkUserRole, userDataState } from 'store/userStore';
import { useSnackbar } from 'notistack';

const AuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const { checkAuth } = useUserActions();
  const userData = useRecoilValue(userDataState);
  const isAdmin = useRecoilValue(checkUserRole('admin'));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    checkAuth()
      .then()
      .finally(() => setLoading(false))
  }, [])
  useEffect(() => {
    if (userData.id && !isAdmin) {
      enqueueSnackbar('You are not an Admin', {
        variant: 'warning'
      })
    }
  }, [userData.id])

  if (loading) {
    return <CenteredLoader />
  }
  return <Outlet />
};

export default AuthCheck;