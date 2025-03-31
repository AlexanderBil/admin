import React, { Suspense } from 'react';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import HomePageSetupContainer from 'layouts/HomePageSetupLayout/HomePageSetupContainer';

const HomePageSetupLayout = () => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <HomePageSetupContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePageSetupLayout;
