import React, { Suspense } from 'react';
import { Typography } from '@mui/material';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import DeploymentRequestTableContainer from 'layouts/DeploymentRequestLayout/DeploymentRequestTableContainer';
import DeploymentRequestFilter from './DeploymentRequestFilter';

const DeploymentRequestLayout = () => {
  return (
    <div>
      <Typography variant="h5" fontWeight={'bold'}>
        Deployment Requests
      </Typography>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <DeploymentRequestFilter />
          <DeploymentRequestTableContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default DeploymentRequestLayout;