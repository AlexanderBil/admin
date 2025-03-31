import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const options = [
  {
    value: false,
  },
];

export const FormInputCheckbox = ({ name, control, setValue, label, setShowInput }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setShowInput(prev => !prev);
  };

  useEffect(() => {
    setValue(name, checked);
  }, [checked]);

  return (
    <FormControl size={'small'} variant={'outlined'}>
      <div>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({}) => {
                    return (
                      <Checkbox checked={checked} onChange={handleChange} />
                    );
                  }}
                  control={control}
                />
              }
              label={label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};

FormInputCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.any.isRequired,
  setShowInput: PropTypes.func.isRequired,
};
