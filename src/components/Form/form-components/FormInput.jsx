import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { fullDataFromSelectEmail } from 'store/sendFundsStore';
import { fullDataFromUser } from 'store/nftSponsorshipStore';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { isOpenModal, filtersByEmail } from 'store/sendFundsStore';
import { openNftModal, filterByEmail } from 'store/nftSponsorshipStore';
import { inputsData } from '../../../store/homePageSetupStore';

export const FormInput = ({
  name,
  control,
  label,
  type,
  fieldName,
  handleKeywordChange,
  isNeedSetEmail,
  isFunds,
  disabled,
  width,
  setAvailable,
  clearInputsData,
  setClearInputsData,
}) => {
  const setValueToStore = useSetRecoilState(inputsData);
  const openModal = useRecoilValue(isFunds ? isOpenModal : openNftModal);
  const setFiltersAccount = useSetRecoilState(
    isFunds ? filtersByEmail : filterByEmail
  );
  const [fullUserData, setFullUserData] = useRecoilState(
    isFunds ? fullDataFromSelectEmail : fullDataFromUser
  );
  const emailData = fullUserData.account?.email;

  const [inputValue, setInputValue] = useState('');

  const setInputValueHandler = (e) => {
    if (e.target.name === 'editorial') {
      setValueToStore((prev) => {
        return {
          ...prev,
          editorialLabel: e.target.value,
        };
      });
    }
    if (e.target.name === 'advertorial') {
      setValueToStore((prev) => {
        return {
          ...prev,
          advertorialLabel: e.target.value,
        };
      });
    }
  };

  useEffect(() => {
    if (inputValue !== '') {
      setAvailable && setAvailable(true);
    }
    if (inputValue === '') {
      setAvailable && setAvailable(false);
    }
    setClearInputsData && setClearInputsData(false);
  }, [inputValue, setAvailable, setClearInputsData]);

  useEffect(() => {
    clearInputsData && setInputValue('');
  }, [clearInputsData]);

  useEffect(() => {
    isNeedSetEmail && setInputValue(emailData);
  }, [emailData]);

  useEffect(() => {
    openModal && setInputValue('');
    setFiltersAccount((prev) => ({ ...prev, isShowFilterList: false }));
    setFullUserData({});
  }, [openModal]);

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
        
      >
        {fieldName}
      </Grid>
      <Grid sx={{width: '100%'}} >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              name={name}
              sx={{
                minWidth: '260px',
                }}
              type={type}
              helperText={error ? error.message : null}
              size='small'
              error={!!error}
              onChange={(e) => {
                onChange(e);
                handleKeywordChange && handleKeywordChange(e);
                setInputValue(e.target.value);
                setInputValueHandler(e);
              }}
              value={inputValue || value || ''}
              fullWidth
              label={label}
              variant='outlined'
              disabled={disabled}
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
  handleKeywordChange: PropTypes.func,
  isNeedSetEmail: PropTypes.bool,
  isFunds: PropTypes.bool,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  setAvailable: PropTypes.func,
  clearInputsData: PropTypes.bool,
  setClearInputsData: PropTypes.func,
};
