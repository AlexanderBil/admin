import React, { Suspense } from 'react';
import { Typography } from '@mui/material';
import AccessRequestFilter from './AccessRequestFilter';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import AccessRequestTableContainer from 'layouts/AccessRequestLayout/AccessRequestTableContainer';

const AccessRequestLayout = () => {
  return (
    <div>
      <Typography variant="h5" fontWeight={'bold'}>
        Access Request
      </Typography>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <AccessRequestFilter />
          <AccessRequestTableContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default AccessRequestLayout;