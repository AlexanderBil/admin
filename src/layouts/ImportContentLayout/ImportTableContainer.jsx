import React, { useState } from 'react';
import Table from 'components/Table';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modeList } from './ImportForm/ImportForm';

import {
  importContentState,
  importContentFiltersState,
  localesData,
  sourceListState,
  detailsCode,
} from 'store/importContentStore';
import { globalDetails } from 'store/invitationStore';
import ImportContentModal from './ImportContentModal';
import { getImportContentDetails } from 'services/importContentService';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  optionsBox: {
    maxWidth: '320px',
    minWidth: '170px',
    wordBreak: 'break-all',
    [theme.breakpoints.down('laptop')]: {
      maxWidth: '100%',
    },
    [theme.breakpoints.down('tablet')]: {
      maxWidth: '220px',
    },
  },
  pageBox: {
    display: 'flex',
    maxWidth: '200px',
    width: '100%',
    [theme.breakpoints.down('laptop')]: {
      justifyContent: 'flex-end',
      maxWidth: '100%',
    },
  },
  authorBox: {
    display: 'flex',
    maxWidth: '320px',
    width: '100%',
    [theme.breakpoints.down('laptop')]: {
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      maxWidth: '220px',
    },
  },
}));

const ImportTableContainer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));
  const classes = useStyles();
  const { userData } = useRecoilValue(importContentState);

  const { localesList } = useRecoilValue(localesData);
  const { sourceList } = useRecoilValue(sourceListState);

  const { pagination } = useRecoilValue(importContentState);
  const setFilters = useSetRecoilState(importContentFiltersState);

  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';

  const [openModal, setOpenModal] = useState(false);
  const [importContentDetails, setImportContentDetails] = useState({});

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const seeDetailsHandler = (code) => {
    setOpenModal(true);
    getImportContentDetails(code).then((data) =>
      setImportContentDetails(data.data)
    );
  };

  const [showDetails, setShowDetails] = React.useState(false);
  const setCode = useSetRecoilState(detailsCode);

  const setDetailsCodeHandler = (code, options, created, locale, source) => {
    setCode((prev) => ({
      ...prev,
      code,
      optionsData: {
        options: options,
        created: created,
        locale: locale,
        source: source,
      },
    }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setImportContentDetails({});
    setShowDetails(false);
  };

  const columns = [
    {
      name: 'price',
      label: 'Price',
      renderCell: ({ price, currency }) => (
        <Typography sx={{ fontSize: '15px' }}>
          {price} {currency === 'AlgoToken' ? tokenName : currency}
        </Typography>
      ),
    },
    {
      name: 'locale',
      label: 'Locale',
      renderCell: ({ locale }) => (
        <Typography sx={{ fontSize: '15px' }}>
          {localesList.map((item) => {
            if (item.isoCode === locale) {
              return item.label;
            }
          })}
        </Typography>
      ),
    },
    {
      name: 'status',
      label: 'Status',
      renderCell: ({ status }) => (
        <Typography
          sx={{
            fontSize: '15px',
            color:
              status === 'done'
                ? 'green'
                : status === 'error'
                ? 'red'
                : 'black',
          }}
        >
          {status.toUpperCase()}
        </Typography>
      ),
    },
    {
      name: 'source',
      label: 'Source',
      renderCell: ({ source }) =>
        sourceList.map((item) => {
          if (item.id === Number(source)) {
            return (
              <Typography sx={{ fontSize: '15px' }} key={item.id}>
                {item.name}
              </Typography>
            );
          }
        }),
    },
    {
      name: 'created',
      label: 'Created',
      renderCell: ({ created }) => (
        <Typography sx={{ fontSize: '15px' }}>
          {new Date(created).toLocaleString()}
        </Typography>
      ),
    },
    {
      name: 'author',
      label: 'DCM Author',
      renderCell: ({ author }) => (
        <Box className={classes.authorBox}>
          <Avatar
            sx={{ marginRight: '15px' }}
            src={author.thumbnailUrl && author.thumbnailUrl}
            alt={`${author.first} ${author.last} avatar`}
          >
            {`${author?.first ? author?.first[0] : ''}${
              author?.last ? author?.last[0] : ''
            }`}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: '15px' }}>{author.email}</Typography>

            <Box>
              <Typography sx={{ fontSize: '15px' }}>
                {author.first} {author.last}
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      name: 'options',
      label: 'Options',
      renderCell: ({ options, details }) => (
        <Box className={classes.optionsBox}>
          <Box className={classes.pageBox}>
            {options?.importOptions?.page && (
              <Typography sx={{ fontSize: '15px', marginRight: '10px' }}>
                <span style={{ fontWeight: '500' }}>Page:</span>{' '}
                {options?.importOptions?.page || ''};
              </Typography>
            )}
            {options?.importOptions?.pageSize && (
              <Typography sx={{ fontSize: '15px' }}>
                <span style={{ fontWeight: '500' }}>Page size:</span>{' '}
                {options?.importOptions?.pageSize || ''};
              </Typography>
            )}
          </Box>

          {options?.importOptions?.importMode && (
            <Typography sx={{ fontSize: '15px' }}>
              <span style={{ fontWeight: '500' }}>Import Mode: </span>
              {modeList.map((item) => {
                if (
                  item.value.toLowerCase() ===
                  options?.importOptions?.importMode
                ) {
                  return item.label;
                }
              })}
              ;
            </Typography>
          )}

          {options?.importOptions?.subSource && (
            <Typography sx={{ fontSize: '15px' }}>
              <span style={{ fontWeight: '500' }}> Subsource: </span>
              {options?.importOptions?.subSource};
            </Typography>
          )}
          {details && (
            <Typography sx={{ fontSize: '15px' }}>
              <span style={{ fontWeight: '500' }}> Details: </span> {details}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      name: 'aiCategories',
      label: 'AI Categories',
      renderCell: ({ options }) =>
        options?.aiRequest?.aiCategories?.map((item) => {
          return (
            <Typography key={item} sx={{ fontSize: '15px' }}>
              {item}
            </Typography>
          );
        }),
    },
    {
      name: 'details',
      label: 'See details',
      renderCell: ({ requestCode, options, created, locale, source }) => {
        return (
          <Button
            sx={{
              fontSize: '12px',
              minWidth: '100px',
            }}
            variant='contained'
            onClick={() => {
              seeDetailsHandler(requestCode);
              setDetailsCodeHandler(
                requestCode,
                options,
                created,
                locale,
                source
              );
            }}
          >
            Details
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <hr style={{ borderColor: '#f7fafc5c' }} />
      {!matches && (
        <Typography
          sx={{ borderBottom: '1px solid #000', width: 'fit-content' }}
          variant='h6'
        >
          My imports
        </Typography>
      )}

      <Table
        columns={columns}
        data={userData}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
        from='importContentTable'
      />
      <ImportContentModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        data={importContentDetails}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
    </>
  );
};

export default ImportTableContainer;
