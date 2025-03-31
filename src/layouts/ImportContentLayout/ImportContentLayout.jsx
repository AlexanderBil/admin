import React, { Suspense, useState } from 'react';
import ImportForm from './ImportForm/ImportForm';
import CenteredLoader from 'components/CenteredLoader';
import ErrorBoundary from 'components/ErrorBoundary';
import ImportTableContainer from './ImportTableContainer';
import ImportContentFilter from './ImportContentFilter';
import { Typography } from '@mui/material';

const ImportContentLayout = () => {
  const [importForm, setImportForm] = useState(false);
  const showImportForm = () => setImportForm(!importForm);
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<CenteredLoader />}>
          <ImportForm importForm={importForm} />
          <Typography variant='h6' >Table with user import attempts</Typography>
          <ImportContentFilter importForm={importForm} showImportForm={showImportForm}  />
        </Suspense>
        <Suspense fallback={<CenteredLoader />}>
          <ImportTableContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ImportContentLayout;
