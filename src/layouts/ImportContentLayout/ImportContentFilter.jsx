import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  useRecoilRefresher_UNSTABLE,
  useResetRecoilState,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { useSetDateToSetDateFrom } from './utilsFunctions';

import { DatePickerFilter } from 'components/Filter/DatePickerFilter';
import {
  dateFromDateToImportContent,
  importContentFiltersState,
  localesData,
  importContentState,
} from 'store/importContentStore';

import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const useStyles = makeStyles((theme) => ({
  filterBox: {
    display: 'flex',
    marginTop: '20px',
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
      marginTop: '0px',
    },
  },

  refreshButton: {
    padding: '7px',
    width: '130px',
    textTransform: 'none',
    fontSize: '15px',
    marginRight: '16px',
    [theme.breakpoints.down('laptop')]: {
      padding: '6px',
    },
    [theme.breakpoints.down('mobileL')]: {
      marginTop: '15px',
     
    },
  },
  resetButton: {
    padding: '7px',
    width: '130px',
    textTransform: 'none',
    fontSize: '15px',
    [theme.breakpoints.down('laptop')]: {
      padding: '6px',
      marginLeft: '0px',
    },
    [theme.breakpoints.down('mobileL')]: {
      marginTop: '15px',
    },
  },
  filtersButton: {
    display: 'none',
    [theme.breakpoints.down('tablet')]: {
      display: 'flex',
      marginBottom: '15px',
      width: '140px',
      position: 'relative',
      paddingLeft: '0px',
    },
  },
}));

const statusOptions = {
  All: ['ACTIVE', 'ERROR', 'DONE'],
  Active: ['ACTIVE'],
  Error: ['ERROR'],
  Done: ['DONE'],
};

const ImportContentFilter = ({ importForm, showImportForm }) => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(importContentFiltersState);
  const { setDateStateFrom, setDateStateTo } = useSetDateToSetDateFrom();
  const { dateFrom, dateTo } = useRecoilValue(dateFromDateToImportContent);
  const { localesList } = useRecoilValue(localesData);

  const [localesOptions, setLocalesOptions] = useState({});

  const refresh = useRecoilRefresher_UNSTABLE(importContentState);
  const statusAndLocalesReset = useResetRecoilState(importContentFiltersState);
  const filterDateReset = useResetRecoilState(dateFromDateToImportContent);

  const allFilterReset = () => {
    statusAndLocalesReset();
    filterDateReset();
  };

  useEffect(() => {
    let obj = {};
    let arr = [];
    localesList.map(({ isoCode, label }) => {
      obj[label] = [isoCode];
      arr.push(isoCode);
    });
    setLocalesOptions((prev) => ({
      ...prev,
      All: arr,
      ...obj,
    }));
  }, [localesList]);

  const handleChange = ({ target: { name, value } }) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value.includes('[') ? JSON.parse(value) : value,
    }));
  };

  return (
    <Box className={classes.filterBox}>
      <Button
        className={classes.filtersButton}
        onClick={showImportForm}
        endIcon={!importForm && <KeyboardDoubleArrowRightIcon />}
        startIcon={importForm && <KeyboardDoubleArrowLeftIcon />}
      >
        Import Form
      </Button>
      <DatePickerFilter
        setDateStateFrom={setDateStateFrom}
        setDateStateTo={setDateStateTo}
        from={dateFrom}
        to={dateTo}
      />

      <Box>
        <FormControl sx={{ minWidth: 130, marginRight: 2 }} size='small'>
          <InputLabel
            sx={{ backgroundColor: '#ffff' }}
            id='demo-simple-select-label'
          >
            Status
          </InputLabel>
          <Select
            labelId='simple-select-label'
            id='simple-select'
            value={filters.statuses || ''}
            name='statuses'
            label='statuses'
            onChange={handleChange}
          >
            {Object.keys(statusOptions).map((key) => (
              <MenuItem key={key} value={statusOptions[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 130, marginRight: 2 }} size='small'>
          <InputLabel
            sx={{ backgroundColor: '#ffff' }}
            id='demo-simple-select-label'
          >
            Locales
          </InputLabel>
          <Select
            labelId='simple-select-label'
            id='simple-select'
            value={filters.locales || ''}
            name='locales'
            label='locales'
            onChange={handleChange}
          >
            {Object.keys(localesOptions).map((key) => (
              <MenuItem key={key} value={localesOptions[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          className={classes.refreshButton}
          variant='outlined'
          onClick={() => refresh()}
        >
          Refresh
        </Button>
        <Button
          className={classes.resetButton}
          variant='outlined'
          onClick={allFilterReset}
        >
          Reset All
        </Button>
      </Box>
    </Box>
  );
};

export default ImportContentFilter;

ImportContentFilter.propTypes = {
  importForm: PropTypes.bool,
  showImportForm: PropTypes.func,
};
