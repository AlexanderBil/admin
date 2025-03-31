import React, { Suspense } from 'react';
import UsersSubmitionFilter from './UsersSubmitionFilter';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import UsersSubmitionTableContainer from 'layouts/UsersSubmitionLayout/UsersSubmitionTableContainer';

const UsersSubmitionLayout = () => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <UsersSubmitionFilter />
          <UsersSubmitionTableContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UsersSubmitionLayout;
