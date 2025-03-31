import React, { Suspense } from 'react';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import ContentDetails from './ContentDetails';


const ContentDetailsLayout = () => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <ContentDetails />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ContentDetailsLayout;