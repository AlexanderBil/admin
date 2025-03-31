import React, { Suspense } from 'react';
import { Typography } from '@mui/material';
import ParticipantsFilter from './ParticipantsFilter';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import ParticipantsTableContainer from 'layouts/ParticipantsLayout/ParticipantsTableContainer';

const ParticipantsLayout = () => {
  return (
    <div>
      <Typography variant="h5" fontWeight={'bold'}>
        Participants
      </Typography>
      <ParticipantsFilter />
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <ParticipantsTableContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ParticipantsLayout;