import React, { useState } from 'react';
import { Box, Button, InputAdornment, OutlinedInput } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  invitationFiltersState,
  isOpenModalState,
} from 'store/invitationStore';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { Filter } from '../../components/Filter/Filter';
import { ObligetionsInfo } from './ObligetionsInfo';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  filterBox: {
    display: 'flex',

    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
    },
  },
  searchBox: {
    marginLeft: 'auto',
    height: '45px',
    [theme.breakpoints.down('laptop')]: {
      order: '-1',
      width: '100%',
      marginBottom: '20px',
    },
  },
  invitationBox: {
    display: 'flex',
    marginBottom: '0px',
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
      marginBottom: '10px',
    },
  },
  invitationButton: {
    padding: '9px 14px',
    fontSize: '12px',
    marginRight: '14px',
    minWidth: '130px',
    maxHeight: '40px',
    [theme.breakpoints.down('laptop')]: {
      width: '130px',
      marginBottom: '20px',
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
  Active: ['Active'],
  Done: ['Done'],
  Canceled: ['Canceled'],
};

const productOptions = {
  All: ['DCM', 'NftSponsorship'],
  DCM: ['DCM'],
  NftSponsorship: ['NftSponsorship'],
};

const InvitationFilter = () => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(invitationFiltersState);
  const [searchInput, setSearchInput] = useState(filters.keyword);
  const setOpen = useSetRecoilState(isOpenModalState);
  const matchesMedia = useMediaQuery('(min-width:1800px)');
  const media = matchesMedia
    ? { display: 'flex', alignItems: 'flex-start', marginRight: '15px' }
    : {
        display: 'block',
        alignItems: 'flex-start',
        marginRight: '15px',
      };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'roleId' && value === 'all') {
      let cloneFilter = filters;
      const { roleId, ...newObj } = cloneFilter;
      setFilters(() => ({
        ...newObj,
      }));
    }
    else if (name === 'statuses' && value === 'all') {
      let cloneFilter = filters;
      const { statuses, ...newObj } = cloneFilter;
      setFilters(() => ({
        ...newObj,
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

  const handleOpenModal = () => {
    setOpen((prev) => ({ ...prev, open: true }));
  };

  return (
    <Box className={classes.filterBox}>
      <Box sx={media}>
        <Box className={classes.invitationBox}>
          <Button
            className={classes.invitationButton}
            variant='contained'
            onClick={() => handleOpenModal()}
          >
            New invitation
          </Button>

          <Filter
            filters={filters}
            setFilters={setFilters}
            roleOptions={roleOptions}
            SubRoleOptions={SubRoleOptions}
            statusOptions={statusOptions}
            productOptions={productOptions}
            handleChange={handleChange}
            isNeadSelectProduct={false}
            isNeadCheckbox={true}
          />
        </Box>

        <ObligetionsInfo isNeadContainer={true} />
      </Box>
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

export default InvitationFilter;
