import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { CustomizedSwitches } from 'components/Form/form-components/StyledSwitch';
import { makeStyles } from '@mui/styles';
import { useResetRecoilState } from 'recoil';
import {
  dateFromDateToData,
  usersSubmitionFiltersState,
} from 'store/usersSubmitionStore';

const useStyles = makeStyles((theme) => ({
  filterBlock: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  resetButton: {
    height: '40px',
    padding: '7px',
    width: '130px',
    textTransform: 'none',
    marginRight: '15px',
    fontSize: '15px',
    [theme.breakpoints.down('laptop')]: {
      padding: '6px',
    },
    [theme.breakpoints.down('tablet')]: {
      marginTop: '15px'
    },
  },
}));

export const UsersFilter = ({
  filters,
  handleChange,
  statusOptions,
  eventsOptions,
  sortOptions,
}) => {
  const classes = useStyles();

  const statusAndEventsReset = useResetRecoilState(usersSubmitionFiltersState);
  const filterDateReset = useResetRecoilState(dateFromDateToData);

  const allFilterReset = () => {
    statusAndEventsReset();
    filterDateReset();
  };
  return (
    <Box className={classes.filterBlock}>
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

        <FormControl sx={{ minWidth: 130, marginRight: 2 }} size='small'>
          <InputLabel
            sx={{ backgroundColor: '#ffff' }}
            id='demo-simple-select-label'
          >
            Events
          </InputLabel>
          <Select
            labelId='simple-select-label'
            id='simple-select'
            value={filters.events || ''}
            name='events'
            label='events'
            onChange={handleChange}
          >
            {Object.keys(eventsOptions).map((key) => (
              <MenuItem key={key} value={eventsOptions[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Box>
      <Button
         className={classes.resetButton}
        variant='outlined'
        onClick={allFilterReset}
      >
        Reset All
      </Button>

      <CustomizedSwitches from='userFilter' isCheked={true} />
    </Box>
  );
};

UsersFilter.propTypes = {
  filters: PropTypes.any.isRequired,
  statusOptions: PropTypes.object.isRequired,
  eventsOptions: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  sortOptions: PropTypes.object,
};
