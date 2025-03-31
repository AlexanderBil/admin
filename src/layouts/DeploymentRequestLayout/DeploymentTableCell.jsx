import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  styleWithoutHover: {
    whiteSpace: 'nowrap',
    maxWidth: '300px',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('tablet')]: {
      maxWidth: '200px',
      wordBreak: 'break-all',
      whiteSpace: 'normal',
    },
  },
  styleHover: {
    overflow: 'visible',
    textOverflow: 'clip',
    whiteSpace: 'normal',
    cursor: 'pointer',
    maxWidth: '300px',
    width: '100%',
    wordBreak: 'break-all',
    [theme.breakpoints.down('tablet')]: {},
  },
}));

export const DeploymentTableCell = ({ destination }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);

  const onMouseEnterHandler = () => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  };

  return (
    <Box>
      <Box style={{ marginBottom: '3px' }}>
        <Typography style={{ fontSize: '14px' }}>
          {' '}
          <span style={{ fontWeight: '500' }}>Name:</span> {destination.name}{' '}
        </Typography>
      </Box>
      <Box style={{ marginBottom: '3px' }}>
        <Typography style={{ fontSize: '14px' }}>
          {' '}
          <span style={{ fontWeight: '500' }}>Type:</span> {destination.type}{' '}
        </Typography>
      </Box>
      <Box
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={isHover ? classes.styleHover : classes.styleWithoutHover}
      >
        <Typography component='span' style={{ fontSize: '14px' }}>
          {' '}
          <span style={{ fontWeight: '500' }}>Source:</span>{' '}
        </Typography>
        <Link
          target='_blank'
          style={{ color: '#000', textDecorationColor: '#000' }}
          href={destination.source}
        >
          {destination.source}
        </Link>
      </Box>
    </Box>
  );
};

DeploymentTableCell.propTypes = {
  destination: PropTypes.object,
};
