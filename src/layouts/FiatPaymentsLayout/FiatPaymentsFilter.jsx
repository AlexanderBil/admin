import React, { useEffect, useState } from 'react';
import {
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from '@mui/material';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useSetDateToSetDateFrom } from './utilsFunctions';
import { DatePickerFilter } from 'components/Filter/DatePickerFilter';
import { makeStyles } from '@mui/styles';

import {
  fiatPaymentsFiltersState,
  dateFromDateToPaymentState,
  paymentsData,
} from 'store/fiatPaymentsStore';
import { CustomizedSwitches } from 'components/Form/form-components/StyledSwitch';

const useStyles = makeStyles((theme) => ({
  resetButton: {
    height: '40px',
    padding: '7px',
    width: '100px',
    textTransform: 'none',
    marginRight: '15px',
    fontSize: '15px',
    [theme.breakpoints.down('laptop')]: {
      padding: '6px',
    },
    [theme.breakpoints.down('tablet')]: {
      width: '130px',
    },
  },
}));

const FiatPaymentsFilter = () => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(fiatPaymentsFiltersState);
  const { setDateStateFrom, setDateStateTo } = useSetDateToSetDateFrom();
  const { from, to } = useRecoilValue(dateFromDateToPaymentState);
  const { paymentsDataList } = useRecoilValue(paymentsData);

  const [currenciesOptions, setCurrenciesOptions] = useState({});
  const [statusesOptions, setStatusesOptions] = useState({});
  const [scenariosOptions, setScenariosOptions] = useState({});

  const statusAndCurrenciensReset = useResetRecoilState(
    fiatPaymentsFiltersState
  );
  const filterDateReset = useResetRecoilState(dateFromDateToPaymentState);

  const allFilterReset = () => {
    statusAndCurrenciensReset();
    filterDateReset();
  };

  useEffect(() => {
    let currenciesObj = {};
    let statusesObj = {};
    let scenariosObj = {};
    paymentsDataList?.currencies.map(
      (item) => ((currenciesObj.All = 'all'), (currenciesObj[item] = [item]))
    );
    setCurrenciesOptions(currenciesObj);

    paymentsDataList?.paymentStatuses.map((item) => {
      let str = item.toLowerCase();
      const capitalize = (str) => str[0].toUpperCase() + str.substring(1);
      return (statusesObj.All = 'all'), (statusesObj[capitalize(str)] = [item]);
    });
    setStatusesOptions(statusesObj);

    paymentsDataList?.scenarios.map(
      (item) => (
        (scenariosObj.All = 'all'), (scenariosObj[item.value] = [item.key])
      )
    );
    setScenariosOptions(scenariosObj);
  }, [paymentsDataList]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'currencies' && value === 'all') {
      let filter = filters;
      const { currencies, ...newObj } = filter;
      setFilters(newObj);
    }
    if (name === 'statuses' && value === 'all') {
      let filter = filters;
      const { statuses, ...newObj } = filter;
      setFilters(newObj);
    }
    if (name === 'scenarios' && value === 'all') {
      let filter = filters;
      const { scenarios, ...newObj } = filter;
      setFilters(newObj);
    } else if (value !== 'all') {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value.includes('[') ? JSON.parse(value) : value,
      }));
    }
  };

  return (
    <Box sx={{ display: 'flex', paddingTop: '16px', flexWrap: 'wrap' }}>
      <DatePickerFilter
        setDateStateFrom={setDateStateFrom}
        setDateStateTo={setDateStateTo}
        from={from}
        to={to}
      />
      <FormControl
        sx={{
          minWidth: { mobileS: '130px', tablet: '100px' },
          marginRight: 2,
          marginBottom: '15px',
        }}
        size='small'
      >
        <InputLabel
          sx={{ backgroundColor: '#ffff' }}
          id='demo-simple-select-label'
        >
          Currencies
        </InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={filters.currencies || 'all'}
          name='currencies'
          label='Currencies'
          onChange={handleChange}
        >
          {Object.keys(currenciesOptions).map((key) => (
            <MenuItem key={key} value={currenciesOptions[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ minWidth: { mobileS: '130px', tablet: '100px' }, marginRight: 2 }}
        size='small'
      >
        <InputLabel
          sx={{ backgroundColor: '#ffff' }}
          id='demo-simple-select-label'
        >
          Statuses
        </InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={filters.statuses || 'all'}
          name='statuses'
          label='Statuses'
          onChange={handleChange}
        >
          {Object.keys(statusesOptions).map((key) => (
            <MenuItem key={key} value={statusesOptions[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ minWidth: { mobileS: '130px', tablet: '100px' }, marginRight: 2 }}
        size='small'
      >
        <InputLabel
          sx={{ backgroundColor: '#ffff' }}
          id='demo-simple-select-label'
        >
          Scenarios
        </InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={filters.scenarios || 'all'}
          name='scenarios'
          label='Scenarios'
          onChange={handleChange}
        >
          {Object.keys(scenariosOptions).map((key) => (
            <MenuItem key={key} value={scenariosOptions[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={classes.resetButton}
        variant='outlined'
        onClick={allFilterReset}
      >
        Reset All
      </Button>

      <CustomizedSwitches from='paymentFilter' isCheked={true} />
    </Box>
  );
};

export default FiatPaymentsFilter;
