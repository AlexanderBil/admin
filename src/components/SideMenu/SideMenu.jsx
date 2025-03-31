import React, { useMemo } from 'react';
import { Drawer, List, Toolbar, useMediaQuery } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { checkUserRole } from 'store/userStore';
import ListItemLink from 'components/ListItemLink';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    position: 'relative',
    [theme.breakpoints.down('laptopL')]: {
      display: 'none',
    },
  },
  sideBarActive: {
    display: 'block',
    [theme.breakpoints.down('laptopL')]: {
      position: 'absolute',
    },
  },
}));

const SideMenu = ({ isOpenSideMenu, setOpenSideMenu }) => {
  const classes = useStyles();
  const isSuperAdmin = useRecoilValue(checkUserRole('super_admin'));
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('laptopL'));

  const list = useMemo(() => {
    const adminList = [
      { label: 'Statistics', link: 'statistics' },
      { label: 'Participants', link: 'participants' },
      { label: 'Content', link: 'content' },
      { label: 'Import Content', link: 'import-content' },
    ];
    const superAdminList = [
      { label: 'Access Request', link: 'access-request' },
      { label: 'Deployment Requests', link: 'deployment-requests' },
      { label: 'Payments', link: 'payments' },
      { label: 'Invitations', link: 'invitations' },
      { label: 'Send Funds', link: 'send-funds' },
      { label: 'User Submissions', link: 'user-submissions' },
      { label: 'NFT Sponsorship', link: 'nft-sponsorship' },
      { label: 'Homepage Setup', link: 'home-page-setup' },
    ];
    return isSuperAdmin ? [...adminList, ...superAdminList] : adminList;
  }, [isSuperAdmin]);
  return (
    <aside
      className={
        matches && !isOpenSideMenu ? classes.sideBar : classes.sideBarActive
      }
    >
      <Drawer
        variant='permanent'
        sx={{
          width: 240,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List component='nav'>
          {list.map((item, idx) => (
            <ListItemLink
              setOpenSideMenu={setOpenSideMenu}
              link={item.link}
              label={item.label}
              divider
              key={idx}
            />
          ))}
        </List>
      </Drawer>
    </aside>
  );
};

export default SideMenu;

SideMenu.propTypes = {
  isOpenSideMenu: PropTypes.bool,
  setOpenSideMenu: PropTypes.func,
};
