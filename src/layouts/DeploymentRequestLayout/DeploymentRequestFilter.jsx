import React, { useEffect, useState } from 'react';
import { Box, Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useSetDateToSetDateFrom } from './utilsFunctions';
import { DatePickerFilter } from 'components/Filter/DatePickerFilter';
import {
  dateFromDateToDeploymentState,
  deploymentRequestFiltersState,
  deploymentStatusesData,
} from 'store/deploymentRequestStore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({

  resetButton: {
    height: '40px',
    padding: '7px',
    width: '130px',
    textTransform: 'none',
    fontSize: '15px',
    [theme.breakpoints.down('laptop')]: {
      padding: '6px',
    },
    [theme.breakpoints.down('mobileL')]: {
      // marginTop: '15px',
    },
  },

}));


const DeploymentRequestFilter = () => {
  const [filters, setFilters] = useRecoilState(deploymentRequestFiltersState);
  const { setDateStateFrom, setDateStateTo } = useSetDateToSetDateFrom();
  const { from, to } = useRecoilValue(dateFromDateToDeploymentState);
  const { statuses } = useRecoilValue(deploymentStatusesData);
  const [statusOptions, setStatusOptions] = useState({});
  const classes = useStyles();

  const statusReset = useResetRecoilState(deploymentRequestFiltersState);
  const filterDateReset = useResetRecoilState(dateFromDateToDeploymentState);

  useEffect(() => {
    let statusesObj = {};

    statuses?.statuses.map((item) => {
      let str = item.toLowerCase();
      const capitalize = (str) => str[0].toUpperCase() + str.substring(1);
      return (statusesObj.All = 'all'), (statusesObj[capitalize(str)] = [item]);
    });
    setStatusOptions(statusesObj);

  }, [statuses]);

  const allFilterReset = () => {
    statusReset();
    filterDateReset();
  };


  const handleChange = ({ target: { name, value } }) => {
    if (name === 'statuses' && value === 'all') {
      let filter = filters;
      const { statuses, ...newObj } = filter;
      setFilters(newObj);
    } else
      setFilters((prevState) => ({
        ...prevState,
        [name]: value.includes('[') ? JSON.parse(value) : value,
      }));
  };

  return (
    <Box sx={{ display: 'flex', paddingTop: '16px', flexWrap: 'wrap' }}>
      <DatePickerFilter
        setDateStateFrom={setDateStateFrom}
        setDateStateTo={setDateStateTo}
        from={from}
        to={to}
      />
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
          value={filters.statuses || 'all'}
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
      <Button
          className={classes.resetButton}
          variant='outlined'
          onClick={allFilterReset}
        >
          Reset All
        </Button>
    </Box>
  );
};

export default DeploymentRequestFilter;
