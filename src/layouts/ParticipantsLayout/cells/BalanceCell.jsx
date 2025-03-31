import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGetBalance } from './useGetBalance';
import refresh from '../../../images/refresh.png';

const StyledSpan = styled(Typography)(() => ({
  fontWeight: '500',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  cursor: 'pointer',
  color: '#1976d2',
}));

const StyledP = styled(Typography)(() => ({
  fontWeight: '500',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  maxWidth: '300px',
  marginRight: '10px',
}));

const StyledAlgo = styled(Typography)(() => ({
  fontWeight: '500',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  maxWidth: '300px',
  marginRight: '60px',
}));

const StyledImgBox = styled(Box)(() => ({
  height: '32px',
  width: '32px',
  objectFit: 'cover',
  marginTop: '-16px',
  cursor: 'pointer',
  transition: 'all 300ms ease-in',
}));

const styleClick = {
  display: 'none',
};

const styleWithoutClick = {
  whiteSpace: 'nowrap',
  maxWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const BalanceCell = ({ id }) => {
  const [isClick, setIsClick] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const { balance: balanceData, error } = useGetBalance(id, isClick, isRefresh);

  const setIdHandler = () => {
    setIsClick(true);
  };

  const refreshHandler = () => {
    setIsRefresh((prev) => !prev);
  };

  return (
    <Box>
      <StyledSpan
        style={isClick ? styleClick : styleWithoutClick}
        onClick={setIdHandler}
      >
        Check balance
      </StyledSpan>
      <Box style={!isClick ? styleClick : styleWithoutClick}>
        <Box  >
          <Box>
            {balanceData.balance && (
              <StyledAlgo>{balanceData.balance} Algo</StyledAlgo>
            )}
          </Box>
          <Box>
            {error
              ? error
              : balanceData.assetBalances?.map((item) => (
                <Box
                  key={item.assetIndex}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <StyledP>
                    {item.balance} {item.assetUnitName}
                  </StyledP>
                  <StyledImgBox
                    style={{transform: isRefresh ? 'rotate(180deg)' : '' }}
                    onClick={refreshHandler}
                    component='img'
                    alt='Refresh'
                    src={refresh}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

BalanceCell.propTypes = {
  id: PropTypes.number,
};
