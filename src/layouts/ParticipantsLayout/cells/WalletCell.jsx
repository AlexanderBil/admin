import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import MouseOverPopover from '../../../components/Popover';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  hoverTypography: {
    overflow: 'visible',
    textOverflow: 'clip',
    whiteSpace: 'normal',
    maxWidth: '300px',
    wordBreak: 'break-all',
    cursor: 'pointer',
    fontSize: '14px',
  },

  withoutHoverTypography: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '300px',
    fontSize: '14px',
    marginBottom: '5px',
    [theme.breakpoints.down('laptopL')]: {
      maxWidth: '200px',
      overflow: 'visible',
      whiteSpace: 'normal',
      wordBreak: 'break-all'
    },
  }
}));

export const WalletCell = ({ wallets }) => {
  const [isHover, setIsHover] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [copyText, setCopyText] = useState('Copy');
  const classes = useStyles();

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onMouseEnterHandler = (event) => {
    setIsHover(true);
    setAnchorEl(event.currentTarget);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
    handlePopoverClose();
    setCopyText('Copy');
  };

  const copyWallet = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
    } catch (e) {}
    setCopyText('Copied!');
  };

  return (
    wallets &&
    wallets.map((item) =>
      item.address ? (
        <Box key={item.address}>
          <Typography
            className={isHover ? classes.hoverTypography : classes.withoutHoverTypography }
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup='true'
            onClick={() => copyWallet(item.address)}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
          >
            {' '}
            <span style={{fontWeight: '500' }}>{item.chain}</span> -{' '}
            {item.address}
          </Typography>
          <MouseOverPopover
            open={open}
            handlePopoverClose={handlePopoverClose}
            anchorEl={anchorEl}
            copyText={copyText}
          />
        </Box>
      ) : null
    )
  );
};

WalletCell.propTypes = {
  wallets: PropTypes.array,
};
