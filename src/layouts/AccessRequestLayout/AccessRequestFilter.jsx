import React, { useState } from 'react';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { useRecoilState } from 'recoil';
import { accessRequestFiltersState } from 'store/accessRequestStore';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { Filter } from '../../components/Filter/Filter';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  filterBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0px 16px 0px',
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  searchBox: {
    height: '45px',
    marginLeft: 'auto',
    [theme.breakpoints.down('laptop')]: {
      marginLeft: 0,
      order: '-1',
      marginBottom: '15px',
    },
    [theme.breakpoints.down('mobileL')]: {
      width: '100%',
    },
  },
}));

const roleOptions = {
  All: 'all',
  Publisher: 'mp_publisher',
  Creator: 'mp_creator',
};

const SubRoleOptions = {
  Advertiser: 'mp_brand',
  Startup: 'mp_startup',
};

const statusOptions = {
  All: 'all',
  Pending: ['Pending'],
  Done: ['Done'],
  Canceled: ['Canceled'],
};

const productOptions = {
  All: 'all',
  DCM: ['DCM'],
  NftSponsorship: ['NftSponsorship'],
};

const AccessRequestFilter = () => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(accessRequestFiltersState);
  const [searchInput, setSearchInput] = useState(filters.keyword);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'roleId' && value === 'all') {
      let cloneFilter = filters;
      const { roleId, ...newObj } = cloneFilter;
      setFilters(() => ({
        ...newObj,
      }));
    } else if (name === 'statuses' && value === 'all') {
      let filter = filters;
      const { statuses, ...newObj } = filter;
      setFilters(newObj);
    } else if (name === 'products' && value === 'all') {
      let filter = filters;
      const { products, ...newObj } = filter;
      setFilters(newObj);
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
    <Box className={classes.filterBox}>
      <Filter
        filters={filters}
        setFilters={setFilters}
        roleOptions={roleOptions}
        SubRoleOptions={SubRoleOptions}
        statusOptions={statusOptions}
        productOptions={productOptions}
        isNeadSelectProduct={true}
        isNeadCheckbox={false}
        handleChange={handleChange}
      />

      <OutlinedInput
        className={classes.searchBox}
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

export default AccessRequestFilter;
