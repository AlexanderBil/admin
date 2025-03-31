import React, { useState } from 'react';
import RoleCheck from 'components/RoleCheck';
import SideMenu from 'components/SideMenu';
import Header from 'components/Header';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AdminLayout = () => {
  const [isOpenSideMenu, setOpenSideMenu] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <>
      <Header
        isOpenSideMenu={isOpenSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
      <main style={{ display: 'flex' }}>
        <SideMenu
          isOpenSideMenu={isOpenSideMenu}
          setOpenSideMenu={setOpenSideMenu}
        />
        <div style={{ width: '100%' }}>
          <Toolbar />
          <Box sx={{ p: matches ? 1 : 2 }}>
            <RoleCheck role='admin' />
          </Box>
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
