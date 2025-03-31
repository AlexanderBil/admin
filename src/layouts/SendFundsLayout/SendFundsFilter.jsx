import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { sendFundsFiltersState, isOpenModal } from 'store/sendFundsStore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSetDateToSetDateFrom } from '../SendFundsLayout/utilsFunctions';
import { dateFromDateToState } from 'store/sendFundsStore';
import { ObligetionsInfo } from 'layouts/InvitationLayout/ObligetionsInfo';
import { DatePickerFilter } from 'components/Filter/DatePickerFilter';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  sendBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    [theme.breakpoints.down('laptopL')]: {
      flexDirection: 'column',
    },
  },
  filterBox: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      marginBottom: '15px',
    },
  },
  sendButton: {
    padding: '9px 14px',
    fontSize: '12px',
    marginRight: '14px',
    minWidth: '130px',
    maxHeight: '38px',
    [theme.breakpoints.down('tablet')]: {
      width: '130px',
      marginBottom: '15px',
    },
  },
  resetButton: {
    height: '40px',
    padding: '7px',
    width: '130px',
    textTransform: 'none',
    fontSize: '15px',
    [theme.breakpoints.down('laptop')]: {
      padding: '6px',
    },
    [theme.breakpoints.down('tablet')]: {
     
    },
  },
}));

const eventIdOptions = {
  All: 'all',
  Request: 'request',
  Join: 'join',
};

const SendFundsFilter = () => {
  const classes = useStyles();
  const matchesMedia = useMediaQuery('(min-width:1800px)');
  const [filters, setFilters] = useRecoilState(sendFundsFiltersState);

  const setOpen = useSetRecoilState(isOpenModal);

  const { setDateStateFrom, setDateStateTo } = useSetDateToSetDateFrom();
  const { dateFrom, dateTo } = useRecoilValue(dateFromDateToState);

  const statusAndLocalesReset = useResetRecoilState(sendFundsFiltersState);
  const filterDateReset = useResetRecoilState(dateFromDateToState);

  const allFilterReset = () => {
    statusAndLocalesReset();
    filterDateReset();
  };

  const media = matchesMedia
    ? { display: 'flex', alignItems: 'flex-start', marginRight: '15px' }
    : {
      display: 'block',
      alignItems: 'flex-start',
      marginRight: '15px',
    };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'eventId' && value === 'all') {
      setFilters(() => ({
        page: 0,
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        page: 0,
        [name]: value.includes('[') ? JSON.parse(value) : value,
      }));
    }
  };

  const handleOpenModal = () => {
    setOpen((prev) => ({ ...prev, open: true }));
  };

  return (
    <div className={classes.sendBox}>
      <Box sx={media}>
        <Box className={classes.filterBox}>
          <Button
            className={classes.sendButton}
            variant='contained'
            onClick={() => handleOpenModal()}
          >
            Send funds
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
                Event Type
              </InputLabel>
              <Select
                labelId='simple-select-label'
                id='simple-select'
                value={filters.eventId || 'all'}
                name='eventId'
                label='eventId'
                onChange={handleChange}
              >
                {Object.keys(eventIdOptions).map((key) => (
                  <MenuItem key={key} value={eventIdOptions[key]}>
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

        </Box>
      </Box>
      <Box>
        <ObligetionsInfo isNeadContainer={false} />
      </Box>
    </div>
  );
};

export default SendFundsFilter;
