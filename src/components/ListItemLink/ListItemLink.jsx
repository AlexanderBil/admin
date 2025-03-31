import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListItemLink = ({ label, link, setOpenSideMenu }) => {
  const resolved = useResolvedPath(link);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton
        onClick={() => setOpenSideMenu(false) }
        divider
        sx={match ? {
          bgcolor: 'rgba(0, 0, 0, 0.04)'
        }: {}}
      >
        <ListItemText primary={label} />
      </ListItemButton>
    </Link>
  );
};

ListItemLink.propTypes = {
  label: PropTypes.string.isRequired,
  link : PropTypes.string.isRequired,
  setOpenSideMenu : PropTypes.func,
};

export default ListItemLink;
