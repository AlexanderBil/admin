import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import { Switch } from '@mui/material';

export const FormSwitcher = ({ name, control, formSwitcherValue, setFormSwitcherValue }) => {

  return (
    <section>
      <label> AI Content Quality Check</label>

      <Controller
        control={control}
        name={name}
        defaultValue={formSwitcherValue}
        render={({ field: { onChange, value } }) => (
          <>
            <Switch
              checked={formSwitcherValue}
              onChange={(e) => {
                onChange(e);
                setFormSwitcherValue && setFormSwitcherValue(e.target.checked)
              }}
              value={formSwitcherValue}
            />
          </>
        )}
      />
    </section>
  );
};

FormSwitcher.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  formSwitcherValue: PropTypes.bool,
  setFormSwitcherValue: PropTypes.func,
};
