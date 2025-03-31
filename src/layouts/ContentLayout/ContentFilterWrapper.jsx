import { Box } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredContentAccount } from 'store/contentStore';
import { ContentFilterList } from './ContentFilterList';

const ContentFilterWrapper = () => {
  const filteredData = useRecoilValue(filteredContentAccount);
  return filteredData.data[1].length !== 0 ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ContentFilterList />
    </Box>
  ) : null;
};

export default ContentFilterWrapper;
