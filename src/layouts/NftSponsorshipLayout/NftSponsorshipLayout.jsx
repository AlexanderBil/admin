import React, { Suspense } from 'react';
import NftSponsorshipFilter from './NftSponsorshipFilter';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import NftSponsorshipTableContainer from 'layouts/NftSponsorshipLayout/NftSponsorshipTableContainer';
import NftSummaryTable from './NftSummaryTable';

const NftSponsorshipLayout = () => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <NftSponsorshipFilter />
          <Suspense fallback={<CenteredLoader />}>
            <NftSummaryTable />
            <NftSponsorshipTableContainer />
          </Suspense>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default NftSponsorshipLayout;
