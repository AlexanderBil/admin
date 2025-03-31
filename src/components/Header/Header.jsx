import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userDataState } from 'store/userStore';
import { Logout } from '@mui/icons-material';
import ContactPage from '@mui/icons-material/AccountCircle';
import useUserActions from 'hooks/useUserActions';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Sling as Hamburger } from 'hamburger-react';

const styles = {
  appBar: { zIndex: (theme) => theme.zIndex.drawer + 1 },
  toolBar: {
    paddingLeft: { mobileS: '10px', tablet: '16px' },
    display: 'flex',
    justifyContent: 'space-between',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: { width: 32, height: 32 },
  menu: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const Header = ({ isOpenSideMenu, setOpenSideMenu }) => {
  const user = useRecoilValue(userDataState);
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useUserActions();
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();
  const profileHandler = () => {
    navigate('/admin/profile');
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('laptopL'));

  return (
    <header>
      <AppBar sx={styles.appBar}>
        <Toolbar sx={styles.toolBar}>
          {!matches ? (
            <Typography variant='h6'>DCM Admin Panel</Typography>
          ) : (
            <Hamburger
              size={25}
              toggled={isOpenSideMenu}
              toggle={setOpenSideMenu}
            />
          )}
          <Box sx={styles.box}>
            <Typography variant='span' mr={1}>
              {user.first} {user.last}
            </Typography>
            <Tooltip title='Account'>
              <IconButton
                onClick={handleClick}
                size='small'
                aria-controls={open ? 'account-menu' : null}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : null}
              >
                <Avatar
                  sx={styles.avatar}
                  src={user.thumbnailUrl || ''}
                  alt={'avatar'}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{ elevation: 0, sx: styles.menu }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => profileHandler()}>
              <ListItemIcon>
                <ContactPage fontSize='small' />
              </ListItemIcon>
              My profile
            </MenuItem>
            <MenuItem onClick={() => logout()}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;

Header.propTypes = {
  isOpenSideMenu: PropTypes.bool,
  setOpenSideMenu: PropTypes.func,
};
