import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { subRoleToogle } from '../../../store/accessRequestStore';
import { useSetRecoilState } from 'recoil';

const options = [
  {
    label: 'Creator',
    value: 'mp_creator',
  },
  {
    label: 'Publisher',
    value: 'mp_publisher',
  },
];

export const FormInputDropdown = ({ name, control, label }) => {
  const setRole = useSetRecoilState(subRoleToogle);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const generateSingleOptions = () => {
    return options.map((option) => {
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
      spacing={0}
      sx={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Grid
        sx={{
          marginRight: '20px',
          marginBottom: '10px',
        }}
        item
      >
        Role*:
      </Grid>
      <Grid sx={{width: '100%'}} item>
        <FormControl
          sx={{ width: '100%' }}
          size={'small'}
        >
          <InputLabel sx={{ background: 'white' }}>{label}</InputLabel>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={(e) => {
                  onChange(e);
                  handleChange(e);
                }}
                value={value}
              >
                {generateSingleOptions()}
              </Select>
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
};
