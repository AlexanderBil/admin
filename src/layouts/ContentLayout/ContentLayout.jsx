import React, { Suspense, useState } from 'react';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import ContentDataContainer from './ContentDataContainer';
import ContentFilter from './ContentFilter';
import { Grid } from '@mui/material';

const ContentLayout = () => {
  const [sidebarFilter, setSidebarFilter] = useState(false);
  const showSidebarFilter = () => setSidebarFilter(!sidebarFilter);

  return (
    <Grid container display={'flex'}>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <ContentFilter sidebarFilter={sidebarFilter} />
          <ContentDataContainer sidebarFilter={sidebarFilter} showSidebarFilter={showSidebarFilter} />
        </Suspense>
      </ErrorBoundary>
    </Grid>
  );
};

export default ContentLayout;
