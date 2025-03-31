import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import React, { Suspense } from 'react';
import SummaryStatisticLayout from './SummaryStatisticLayout';
import DailyStatisticLayout from './DailyStatisticLayout';

const StatisticsLayout = () => {
  return (
    <div>
      <Suspense fallback={<CenteredLoader />}>
        <ErrorBoundary>
          <SummaryStatisticLayout />
          <DailyStatisticLayout />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default StatisticsLayout;
