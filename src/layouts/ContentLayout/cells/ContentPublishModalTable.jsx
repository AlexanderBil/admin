import React from 'react';
import PropTypes from 'prop-types';
import Table from 'components/Table';
import { Typography } from '@mui/material';

const ContentPublishModalTable = ({ groupeBulkData }) => {

  const PUBLISHED_DATA = {
    false: 'No',
    true: 'Yes'
  }

  const columns = [
    {
      name: 'contentId',
      label: 'Content ID',
      renderCell: ({ contentId }) => <Typography>{contentId}</Typography>,
    },
    {
      name: 'published',
      label: 'Published',
      renderCell: ({ published }) => (
        <Typography>{PUBLISHED_DATA[published.toString()]}</Typography>
      ),
    },
    {
      name: 'reason',
      label: 'Details',
      renderCell: ({ reason }) => (
        <Typography
          style={{
            color: 'red',
          }}
        >
          {reason}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={groupeBulkData.data?.status}
        from='contentPublish'
        isNeadPagination={true}
      />
    </>
  );
};

export default ContentPublishModalTable;

ContentPublishModalTable.propTypes = {
  groupeBulkData: PropTypes.object,
};
