import React, { Suspense } from 'react';
import SendFundsFilter from './SendFundsFilter';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import SendFundsTableContainer from 'layouts/SendFundsLayout/SendFundsTableContainer';
import { Box } from '@mui/material';

const SendFundsLayout = () => {
  return (
    <Box sx={{ overflow: { mobileS: 'hidden', tablet: 'visible' } }}>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <SendFundsFilter />
          <SendFundsTableContainer />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};

export default SendFundsLayout;
