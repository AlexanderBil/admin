import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import LocalizedDatePicker from 'components/LocalizedDatePicker';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  pickerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '440px',
    marginBottom: '15px',
    [theme.breakpoints.down('laptopL')]: {
      maxWidth: '291px',
    },
  },
}));

export const DatePickerFilter = ({
  setDateStateFrom,
  setDateStateTo,
  from,
  to,
}) => {

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('laptopL'));
  return (
    <Box className={classes.pickerBox}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '15px',
        }}
      >
        <LocalizedDatePicker
          setDay={setDateStateFrom}
          label={'Date from'}
          width={matches ? '130px' : '150px'}
          size='small'
        />
        <Typography>
          {to && !from ? (
            <span style={{ color: 'red' }}>You must fill Date from</span>
          ) : null}
        </Typography>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '15px',
        }}
      >
        <LocalizedDatePicker
          setDay={setDateStateTo}
          label={'Date to'}
          width={matches ? '130px' : '150px'}
          size='small'
        />

        <Typography>
          {from && !to ? (
            <span style={{ color: 'red' }}>You must fill Date to</span>
          ) : null}
        </Typography>
        {from > to && to !== null && (
          <span style={{ color: 'red' }}>Wrong date</span>
        )}
      </Box>
    </Box>
  );
};

DatePickerFilter.propTypes = {
  setDateStateFrom: PropTypes.func,
  setDateStateTo: PropTypes.func,
  from: PropTypes.number,
  to: PropTypes.number,
};
