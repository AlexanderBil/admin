import React, { Suspense } from 'react';
import InvitationFilter from './InvitationFilter';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import InvitationTableContainer from 'layouts/InvitationLayout/InvitationTableContainer';
import { Box } from '@mui/material';

const InvitationLayout = () => {
  return (
    <Box sx={{ overflow: { mobileS: 'hidden', tablet: 'visible' } }}>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <InvitationFilter />
          <InvitationTableContainer />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};

export default InvitationLayout;
