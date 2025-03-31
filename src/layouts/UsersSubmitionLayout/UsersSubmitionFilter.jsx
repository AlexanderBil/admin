import React, { useState } from 'react';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usersSubmitionFiltersState } from 'store/usersSubmitionStore';
import { useSetDateToSetDateFrom } from '../UsersSubmitionLayout/utilsFunctions';
import { dateFromDateToData } from 'store/usersSubmitionStore';
import { UsersFilter } from 'components/Filter/UsersFilter';
import { DatePickerFilter } from 'components/Filter/DatePickerFilter';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  filterBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
    },
  },
  searchBlock: {
    marginLeft: 'auto',
    height: '45px',
    [theme.breakpoints.down('laptop')]: {
      order: '-1',
      width: '100%',
      marginBottom: '15px',
    },
  },
  allfilterBlock: {
    display: 'flex',
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
    },
  },
}));

const statusOptions = {
  All: 'all',
  Pending: ['Pending'],
  Done: ['Done'],
  Canceled: ['Canceled'],
};

const eventsOptions = {
  CONTEST2022: ['CONTEST2022'],
};

const UsersSubmitionFilter = () => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(usersSubmitionFiltersState);
  const { setDateStateFrom, setDateStateTo } = useSetDateToSetDateFrom();
  const { from, to } = useRecoilValue(dateFromDateToData);
  const [searchInput, setSearchInput] = useState(filters.keyword);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'statuses' && value === 'all') {
      let cloneObj = filters;
      const {statuses, ...newObj} = cloneObj;
      setFilters(() => ({
        ...newObj
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        page: 0,
        [name]: value.includes('[') ? JSON.parse(value) : value,
      }));
    }
  };

  const debounceSearch = useDebounce(handleChange, 500);
  const handleKeywordChange = (event) => {
    setSearchInput(event.target.value);
    debounceSearch(event);
  };

  return (
    <Box className={classes.filterBlock}>
      <Box>
        <Box className={classes.allfilterBlock}>
          <DatePickerFilter
            setDateStateFrom={setDateStateFrom}
            setDateStateTo={setDateStateTo}
            from={from}
            to={to}
          />
          <UsersFilter
            filters={filters}
            handleChange={handleChange}
            statusOptions={statusOptions}
            eventsOptions={eventsOptions}
          />
        </Box>
      </Box>
      <OutlinedInput
        className={classes.searchBlock}
        name='keyword'
        placeholder='Search by email'
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

export default UsersSubmitionFilter;
