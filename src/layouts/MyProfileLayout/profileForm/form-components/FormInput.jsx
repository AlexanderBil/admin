import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export const FormInput = ({
  name,
  control,
  label,
  type,
  fieldName,
  readOnly,
  defaultValues,
  resetValue,
  setResetValue,
}) => {
  const [inputValue, setInputValue] = useState(defaultValues);

  useEffect(() => {
    resetValue && setInputValue(defaultValues);
    setResetValue(false);
  }, [resetValue]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Grid sx={{ color: '#898A8D' }} item>
        {fieldName}
      </Grid>
      <Grid sx={{ width: '100%' }} item>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              inputProps={{ readOnly: readOnly ? true : false }}
              sx={{
                maxWidth: { mobileS: '300px', tablet: '380px' },
                '& fieldset': { border: readOnly ? 'none' : 'block' },
              }}
              type={type}
              helperText={error ? error.message : null}
              size='small'
              error={!!error}
              onChange={(e) => {
                onChange(e);
                setInputValue(e.target.value);
              }}
              value={inputValue}
              fullWidth
              label={label}
              variant='outlined'
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

FormInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  fieldName: PropTypes.string,
  control: PropTypes.object,
  readOnly: PropTypes.bool,
  defaultValues: PropTypes.string,
  resetValue: PropTypes.bool,
  setResetValue: PropTypes.func,
};
