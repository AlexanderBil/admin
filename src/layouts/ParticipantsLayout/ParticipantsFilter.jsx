import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { participantsFiltersState } from 'store/participantsStore';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  wrapperBox: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
    },
  },
  filterWrapper: {
    display: 'flex',
     alignItems: 'center',
      flexWrap: 'wrap', 
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  outlinedInput: {
    height: '45px',
    marginLeft: 'auto',
    [theme.breakpoints.down('tablet')]: {
      marginLeft: '0',
      order: '-1',
      marginBottom: '15px',
    },
  },
  resetButton: {
    textTransform: 'none',
    fontSize: '15px',
    [theme.breakpoints.down('mobileL')]: {
    
    },
  },
}));

const ParticipantsFilter = () => {
  const [filters, setFilters] = useRecoilState(participantsFiltersState);
  const { keyword, role, subRole } = filters;
  const [searchInput, setSearchInput] = useState(keyword);
  const classes = useStyles();

  const allFilterReset = useResetRecoilState(participantsFiltersState);

  const roleOptions = [
    { value: 'all', label: 'All' },
    { value: 'publisher', label: 'Publisher' },
    { value: 'creator', label: 'Creator' },
  ];
  const subRoleOptions = [
    { value: '', label: 'All' },
    { value: 'mp_brand', label: 'Advertiser' },
    { value: 'mp_startup', label: 'Startup' },
  ];

  const handleChange = ({ target: { name, value } }) =>
    setFilters((prevState) => ({
      ...prevState,
      page: 0,
      [name]: value,
    }));
  const debounceSearch = useDebounce(handleChange, 500);

  const handleKeywordChange = (event) => {
    setSearchInput(event.target.value);
    debounceSearch(event);
  };

  return (
    <Box className={classes.wrapperBox} sx={{ py: 2 }}>
      <Box className={classes.filterWrapper} >
        <FormControl>
          <FormLabel id='role-label'>Role</FormLabel>
          <RadioGroup
            sx={{ mr: 4 }}
            row
            aria-labelledby='role-label'
            name='role'
            value={role}
            onChange={handleChange}
          >
            {roleOptions.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                sx={{ mr: 3 }}
                value={value}
                control={<Radio size={'small'} />}
                label={label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id='sub-role-label'>Sub-role</FormLabel>
          <RadioGroup
            row
            aria-labelledby='sub-role-label'
            name='subRole'
            value={subRole}
            onChange={handleChange}
          >
            {subRoleOptions.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                sx={{ mr: 3 }}
                value={value}
                control={<Radio size={'small'} />}
                label={label}
                disabled={role === 'publisher'}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          className={classes.resetButton}
          variant='outlined'
          onClick={allFilterReset}
        >
          Reset All
        </Button>
      </Box>
      <OutlinedInput
        className={classes.outlinedInput}
        name='keyword'
        placeholder='Search'
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

export default ParticipantsFilter;
