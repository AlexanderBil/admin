import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export const FormInput = ({
  name,
  control,
  label,
  type,
  fieldName,

}) => {


  const [inputValue, setInputValue] = useState('');

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Grid item>{fieldName}</Grid>
      <Grid item sx={{width: '100%'}}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type={type}
              helperText={error ? error.message : null}
              size='small'
              error={!!error}
              onChange={(e) => {
                onChange(e);
                setInputValue(e.target.value);
              }}
              value={inputValue || value || ''}
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
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};
