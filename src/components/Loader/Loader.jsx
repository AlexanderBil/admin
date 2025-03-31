import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export const Loader = ({ from }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        paddingBottom: from === 'content_publish' ? '0px' : '10px',
        alignItems: 'center',
        justifyContent: 'center',
        mb: '10px',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

Loader.propTypes = {
  from: PropTypes.string,
};
