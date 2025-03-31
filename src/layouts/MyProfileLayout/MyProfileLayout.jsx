import React, { Suspense } from 'react';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import MyProfileContainer from './MyProfileContainer';


const MyProfileLayout = () => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <MyProfileContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default MyProfileLayout;