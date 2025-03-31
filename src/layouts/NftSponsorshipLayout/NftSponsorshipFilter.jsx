import React, { useEffect, useState } from 'react';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useSetDateToSetDateFrom } from '../NftSponsorshipLayout/utilsFunctions';
import {
  dateFromDateToInfo,
  nftCollectionState,
  nftSponsorshipFiltersState,
} from 'store/nftSponsorshipStore';
import { DatePickerFilter } from 'components/Filter/DatePickerFilter';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { NftFilter } from 'components/Filter/NftFilter';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  statusBlock: {
    display: 'flex',
    [theme.breakpoints.down('laptopL')]: {
      flexDirection: 'column',
    },
  },
  filterBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',

    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
    },
  },
  searchBlock: {
    ml: 'auto',
    height: '45px',
    [theme.breakpoints.down('laptop')]: {
      order: '-1',
      marginBottom: '15px',
    },
  },
}));

const statusOptions = {
  Active: 'Active',
  Done: 'Done',
  Pending: 'Pending',
  Error: 'Error',
  Voided: 'Voided',
  Deposited: 'Deposited',
};

const referralOptions = {
  None: '',
  Recognized: 'recognized',
  'Not recognized': 'not_recognized',
  'Any code': 'any',
  'Without code': 'no',
};

const acquisitionModelOptions = {
  'Sponsorship Landing': 'SponsorshipLanding',
  Imu: 'Imu',
};

const NftSponsorshipFilter = () => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(nftSponsorshipFiltersState);
  const { setDateStateFrom, setDateStateTo } = useSetDateToSetDateFrom();
  const { dateFrom, dateTo } = useRecoilValue(dateFromDateToInfo);
  const [searchInput, setSearchInput] = useState(filters.keyword);
  const collectionOptions = useRecoilValue(nftCollectionState);

  const [collectionsData, setCollectionsData] = useState([]);
  const [acquisitionModelData, setAcquisitionModelData] = useState([]);

  const [statusData, setStatusData] = useState([
    'Active',
    'Done',
    'Pending',
    'Error',
    'Voided',
    'Deposited',
  ]);

  useEffect(() => {
    if (!filters.statuses) {
      setStatusData([
        'Active',
        'Done',
        'Pending',
        'Error',
        'Voided',
        'Deposited',
      ]);
    }
  }, [filters.statuses]);

  useEffect(() => {
    if (!filters.acquisitionModels) {
      setAcquisitionModelData([]);
    }
  }, [filters.acquisitionModels]);

  useEffect(() => {
    if (!filters.collectionIds) {
      setCollectionsData([]);
    }
  }, [filters.collectionIds]);


  const handleChange = ({ target: { name, value } }) => {
    name === 'statuses' &&
      setStatusData(typeof value === 'string' ? value.split(',') : value);
    name === 'acquisitionModels' &&
      setAcquisitionModelData(
        typeof value === 'string' ? value.split(',') : value
      );
    name === 'collectionIds' &&
      setCollectionsData(typeof value === 'string' ? value.split(',') : value);

    setFilters((prevState) => ({
      ...prevState,
      page: 0,
      [name]: value.includes('[') ? JSON.parse(value) : value,
    }));
  };

  const debounceSearch = useDebounce(handleChange, 500);
  const handleKeywordChange = (event) => {
    setSearchInput(event.target.value);
    debounceSearch(event);
  };

  return (
    <Box className={classes.filterBlock}>
      <Box>
        <Box className={classes.statusBlock}>
          <DatePickerFilter
            setDateStateFrom={setDateStateFrom}
            setDateStateTo={setDateStateTo}
            from={dateFrom}
            to={dateTo}
          />

          <NftFilter
            filters={filters}
            handleChange={handleChange}
            statusOptions={statusOptions}
            statusData={statusData}
            acquisitionModelData={acquisitionModelData}
            acquisitionModelOptions={acquisitionModelOptions}
            referralOptions={referralOptions}
            collectionsData={collectionsData}
            collectionOptions={collectionOptions}
          />
        </Box>
      </Box>
      <OutlinedInput
        className={classes.searchBlock}
        name='keyword'
        placeholder='Search by user'
        startAdornment={
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        }
        value={searchInput}
        onChange={handleKeywordChange}
      />
    </Box>
  );
};

export default NftSponsorshipFilter;
