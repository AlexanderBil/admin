import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  styleHover: {
    overflow: 'visible',
    textOverflow: 'clip',
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    [theme.breakpoints.down('laptop')]: {},
  },
  styleWithoutHover: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('laptop')]: {
      overflow: 'visible',
      wordBreak: 'break-all',
      whiteSpace: 'normal',
    },
  },
}));

const StyledSpan = styled(Typography)(() => ({
  fontWeight: '500',
  fontSize: '14px',
  whiteSpace: 'nowrap',
}));

export const NameTableCell = ({
  email,
  name,
  ip,
  wallet,
  accountEmail,
  accountUserName,
}) => {
  const [isHover, setIsHover] = useState(false);
  const classes = useStyles();

  const onMouseEnterHandler = () => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  };

  return (
    <Box sx={{ maxWidth: '250px' }}>
      <Box>{name}</Box>
      <Box sx={{ marginBottom: '3px' }}>{email}</Box>

      {ip && (
        <Box sx={{ marginBottom: '5px' }}>
          <StyledSpan sx={{ display: 'inline-block', marginBottom: '3px' }}>
            Ip:{' '}
          </StyledSpan>{' '}
          {ip}
        </Box>
      )}

      {accountEmail && (
        <Box sx={{ marginBottom: '5px' }}>
          <StyledSpan sx={{ display: 'inline-block', marginBottom: '3px' }}>
            DCM account:{' '}
          </StyledSpan>
          <Box>{accountUserName}</Box>
          <Box>{accountEmail}</Box>
        </Box>
      )}

      {wallet && (
        <Box
          className={isHover ? classes.styleHover : classes.styleWithoutHover}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <StyledSpan>Wallet: </StyledSpan>
          {wallet}
        </Box>
      )}
    </Box>
  );
};

NameTableCell.propTypes = {
  title: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  ip: PropTypes.string,
  wallet: PropTypes.string,
  accountEmail: PropTypes.string,
  accountUserName: PropTypes.string,
};
