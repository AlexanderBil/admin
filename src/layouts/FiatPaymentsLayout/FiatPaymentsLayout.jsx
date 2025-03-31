import React, { Suspense } from 'react';
import { Typography } from '@mui/material';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import FiatPaymentsTableContainer from './FiatPaymentsTableContainer';
import FiatPaymentsFilter from './FiatPaymentsFilter';

const FiatPaymentsLayout = () => {
  return (
    <div>
      <Typography variant='h5' fontWeight={'bold'}>
        Payments
      </Typography>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <FiatPaymentsFilter />
          <FiatPaymentsTableContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default FiatPaymentsLayout;
