import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link, styled, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import {
  nftSponsorshipService,
  nftSponsorshipState,
} from 'store/nftSponsorshipStore';
import { nftSponsorshipFiltersState } from 'store/nftSponsorshipStore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  transactionBlock: {
    minWidth: '270px',
    maxWidth: '270px',
    [theme.breakpoints.down('tablet')]: {
      minWidth: '220px',
      maxWidth: '220px',
    },
  },
  styleHoverSource: {
    overflow: 'visible',
    textOverflow: 'clip',
    whiteSpace: 'normal',
    cursor: 'pointer',
    maxWidth: '400px',
    wordBreak: 'break-all',
    marginBottom: '8px',
    [theme.breakpoints.down('tablet')]: {},
  },
  styleWithoutHoverSource: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '8px',
    [theme.breakpoints.down('tablet')]: {
      overflow: 'visible',
      wordBreak: 'break-all',
      whiteSpace: 'normal',
    },
  },
}));

const StyledSpan = styled(Typography)(() => ({
  fontWeight: '500',
  fontSize: '14px',
}));

const styleHover = {
  overflow: 'visible',
  textOverflow: 'clip',
  whiteSpace: 'normal',
  cursor: 'pointer',
  maxWidth: '400px',
  wordBreak: 'break-all',
  marginBottom: '8px',
};

const styleWithoutHover = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '8px',
};

export const TransactionTableCell = ({
  transactionId,
  dealTransactionId,
  acquisitionModel,
  blockchain,
  sourceUrl,
  depositWallet,
  promoCode,
  promoCodePartner,
  sourcePartner,
}) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);
  const [isHoverSource, setIsHoverSource] = useState(false);
  const service = useRecoilValue(nftSponsorshipService);
  const [dealLink, setDealLink] = useState('');
  const { pagination } = useRecoilValue(nftSponsorshipState);
  const filter = useRecoilValue(nftSponsorshipFiltersState);

  useEffect(() => {
    service.data.sideChains.map((item) => {
      if (item.name === blockchain) {
        setDealLink(`${item.explorer}/tx/${dealTransactionId}`);
      }
    });
    if (blockchain === 'Algorand') {
      setDealLink(`https://testnet.algoexplorer.io/tx/${dealTransactionId}`);
    }
  }, [pagination.page, filter]);

  const onMouseEnterHandler = () => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  };

  const onMouseEnterHandlerSource = () => {
    setIsHoverSource(true);
  };

  const onMouseLeaveHandlerSource = () => {
    setIsHoverSource(false);
  };

  return (
    <Box className={classes.transactionBlock}>
      {transactionId && (
        <Box sx={{ marginBottom: '8px' }}>
          <StyledSpan>Payment TX id:</StyledSpan> {transactionId}
        </Box>
      )}
      {dealTransactionId && (
        <Box
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          style={isHover ? styleHover : styleWithoutHover}
        >
          <StyledSpan>Deal TX id: </StyledSpan>
          <Link
            target='_blank'
            style={{ color: '#000', textDecorationColor: '#000' }}
            href={dealLink}
          >
            {dealTransactionId}
          </Link>
        </Box>
      )}

      {promoCodePartner && promoCode ? (
        <Box>
          <StyledSpan>Referral code: </StyledSpan>
          <Box sx={{ marginLeft: '10px' }}>Code: {promoCode}</Box>
          <Box sx={{ marginLeft: '10px' }}>Partner: {promoCodePartner}</Box>
        </Box>
      ) : promoCode ? (
        <Box>
          <StyledSpan>Referral code: </StyledSpan>
          <Box sx={{ marginLeft: '10px' }}>Code: {promoCode}</Box>
          <Box sx={{ marginLeft: '10px' }}>
            Partner: <span style={{ fontWeight: '500' }}>not recognized</span>{' '}
          </Box>
        </Box>
      ) : null}
      <Box sx={{ marginBottom: '8px' }}>
        <StyledSpan sx={{ display: 'inline-block' }}>
          Acquisition Model:
        </StyledSpan>{' '}
        {acquisitionModel}
      </Box>
      {sourceUrl && (
        <Box
          onMouseEnter={onMouseEnterHandlerSource}
          onMouseLeave={onMouseLeaveHandlerSource}
          className={
            isHoverSource
              ? classes.styleHoverSource
              : classes.styleWithoutHoverSource
          }
        >
          <StyledSpan>Source: </StyledSpan>
          <Link
            target='_blank'
            style={{ color: '#000', textDecorationColor: '#000' }}
            href={sourceUrl}
          >
            {sourceUrl}
          </Link>
        </Box>
      )}
      {sourcePartner && (
        <Box sx={{ marginBottom: '8px' }}>
          <StyledSpan sx={{ display: 'inline-block' }}>Publisher:</StyledSpan>{' '}
          {sourcePartner}
        </Box>
      )}
      {depositWallet && (
        <Box sx={{ marginBottom: '3px' }}>
          <StyledSpan>Deposit wallet: </StyledSpan>
          <span style={{ maxWidth: '200px', wordBreak: 'break-all' }}>
            {depositWallet}
          </span>
        </Box>
      )}
    </Box>
  );
};

TransactionTableCell.propTypes = {
  transactionId: PropTypes.string,
  dealTransactionId: PropTypes.string,
  acquisitionModel: PropTypes.string,
  blockchain: PropTypes.string,
  sourceUrl: PropTypes.string,
  depositWallet: PropTypes.string,
  promoCode: PropTypes.string,
  promoCodePartner: PropTypes.string,
  sourcePartner: PropTypes.string,
};
