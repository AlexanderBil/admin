import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { checkUserRole } from 'store/userStore';
import { Outlet, Navigate } from 'react-router-dom';

const RoleCheck = ({ role = '' }) => {
  const isRightRole = useRecoilValue(checkUserRole(role))
  return isRightRole ? <Outlet /> : <Navigate to="/" replace />
};

RoleCheck.propTypes = {
  role: PropTypes.oneOf(['admin', 'super_admin']).isRequired
};

export default RoleCheck;