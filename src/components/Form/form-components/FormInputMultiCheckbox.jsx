import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const options = [
  {
    label: 'Advertiser',
    value: 'mp_brand',
  },
  {
    label: 'Startup',
    value: 'mp_startup',
  },
];

export const FormInputMultiCheckbox = ({
  name,
  control,
  setValue,
  label,
  roleValue,
  subRole,
}) => {

  const [selectedItems, setSelectedItems] = useState(subRole);

  const handleSelect = (value) => {
    if (selectedItems === value) {
      setSelectedItems('');
    } else {
      setSelectedItems(value);
    }
  };

  useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (roleValue === 'mp_publisher') {
      setSelectedItems('');
    }
  }, [roleValue]);

  return (
    <Grid
      container
      spacing={2}
      sx={{  alignItems: 'center' }}
    >
      <Grid item>Subrole:</Grid>
      <Grid item>
        <FormControl
          sx={{ minWidth: '282px' }}
          size={'small'}
          variant={'outlined'}
        >
          <FormLabel component='legend'>{label}</FormLabel>
          <div>
            {options.map((option) => {
              return (
                <FormControlLabel
                  control={
                    <Controller
                      name={name}
                      render={({}) => {
                        return (
                          <Checkbox
                            checked={selectedItems === option.value}
                            onChange={() => handleSelect(option.value)}
                            disabled={roleValue === 'mp_publisher'}
                          />
                        );
                      }}
                      control={control}
                    />
                  }
                  label={option.label}
                  key={option.value}
                />
              );
            })}
          </div>
        </FormControl>
      </Grid>
    </Grid>
  );
};

FormInputMultiCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  roleValue: PropTypes.string.isRequired,
  subRole: PropTypes.string,
};
