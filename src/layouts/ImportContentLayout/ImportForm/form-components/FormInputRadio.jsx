import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';

export const FormInputRadio = ({
  name,
  control,
  label,
  modeList,
  classificationList,
}) => {
  const options = modeList ? modeList : classificationList;

  const generateRadioOptions = () => {
    return options.map((singleOption) =>
      singleOption.tooltipValue ? (
        <Tooltip key={singleOption.label} title={singleOption.tooltipValue}>
          <FormControlLabel
            disabled={singleOption.disabledField}
            key={singleOption.value}
            value={singleOption.value}
            label={singleOption.label}
            control={<Radio />}
          />
        </Tooltip>
      ) : (
        <FormControlLabel
          disabled={singleOption.disabledField}
          key={singleOption.value}
          value={singleOption.value}
          label={singleOption.label}
          control={<Radio />}
        />
      )
    );
  };

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup
            sx={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}
            value={
              modeList
                ? value || 'SAVE'
                : classificationList
                  ? value || 'Article'
                  : value || ''
            }
            onChange={onChange}
          >
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

FormInputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  modeList: PropTypes.array,
  classificationList: PropTypes.array,
};
