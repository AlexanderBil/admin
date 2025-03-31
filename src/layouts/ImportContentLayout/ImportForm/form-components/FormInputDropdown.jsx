import { FormControl, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  selectBlock: {
    [theme.breakpoints.down('tablet')]: {
      // width: '200px'
    },
  },
}));

export const FormInputDropdown = ({
  name,
  control,
  label,
  sourceList,
  localesList,
  currencyList,
  setSourceValue,
}) => {
  const classes = useStyles();
  const optionsData = () => {
    let arr = [];
    sourceList
      ? sourceList.map((item) => {
          arr.push({
            label: item.name,
            value: item.id,
          });
        })
      : localesList
      ? localesList.map((item) => {
          arr.push({
            label: item.label,
            value: item.isoCode,
          });
        })
      : (arr = currencyList);
    return arr;
  };

  const generateSingleOptions = () => {
    return optionsData().map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: label !== '1WMT' ? '500px' : '100px',
        width: '100%',
        marginBottom: '20px',
      }}
    >
      {label !== '1WMT' && <Grid item>{label}:</Grid>}
      <Grid item>
        <FormControl size={'small'}>
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.selectBlock}
                label={label}
                size='small'
                select
                sx={{
                  width:
                    label !== '1WMT'
                      ? { mobileS: '200px', tablet: '410px' }
                      : '100px',
                }}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={(e) => {
                  onChange(e);
                  setSourceValue && setSourceValue(e.target.value);
                }}
                value={localesList ? value || 'en' : value || ''}
              >
                {generateSingleOptions()}
              </TextField>
            )}
            control={control}
            name={name}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

FormInputDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  sourceList: PropTypes.array,
  localesList: PropTypes.array,
  currencyList: PropTypes.array,
  setSourceValue: PropTypes.func,
};
