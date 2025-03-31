import React from 'react';
import PropTypes from 'prop-types';
import Table from 'components/Table';
import { Typography, Link } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  importContentDetailsState,
  filterImportContentDetailsState,
} from 'store/importContentStore';

const ImportContentModalTable = () => {
  const { detailsData } = useRecoilValue(importContentDetailsState);

  const { pagination } = useRecoilValue(importContentDetailsState);
  const setFilters = useSetRecoilState(filterImportContentDetailsState);

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const columns = [
    {
      name: 'resource',
      label: 'Resource',
      renderCell: ({ resource, content }) => (
        <Typography>{resource}</Typography>
      ),
    },
    {
      name: 'content',
      label: 'Content',
      renderCell: ({ content, details, status }) => {
        if (content) {
          return (
            <Link
              target='_blank'
              style={{
                color: '#1976d2',
                textDecorationColor: '#000',
                fontSize: '16px',
              }}
              href={`/admin/content/${content}`}
            >
              {content}
            </Link>
          );
        }
        if (details && status === 'IGNORED') {
          let numberPattern = /\d+/g;
          let numberArr = details.match(numberPattern);
          let res = numberArr !== null && Number(numberArr[0]);
          return (
            <Link
              target='_blank'
              style={{
                color: '#1976d2',
                textDecorationColor: '#000',
                fontSize: '16px',
              }}
              href={`/admin/content/${res}`}
            >
              {res}
            </Link>
          );
        }
      },
    },
    {
      name: 'status',
      label: 'Status',
      renderCell: ({ status }) => (
        <Typography
          style={{
            color: '#000',
            textDecorationColor: '#000',
            textTransform: 'lowercase',
          }}
        >
          {status}
        </Typography>
      ),
    },
    {
      name: 'details',
      label: 'Details',
      renderCell: ({ details }) =>
        details && (
          <Typography
            sx={{
              color: 'red',
              maxWidth: { mobileS: '150px', tablet: '350px', laptop: '550px' },
            }}
          >
            {details}
          </Typography>
        ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={detailsData}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
        from='importContentModal'
      />
    </>
  );
};

export default ImportContentModalTable;

ImportContentModalTable.propTypes = {
  detailsData: PropTypes.array,
};
