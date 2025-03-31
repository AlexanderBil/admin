import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import {
  fullUserSelectData,
  portalEdicaseSelectData,
} from 'store/importContentStore';

import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  selectBlock: {
    [theme.breakpoints.down('tablet')]: {
      // width: '200px'
    },
  },
}));

const CustomDiv = styled('div')({
  zIndex: 11,
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '12px 16px',
  background: '#E0FFFF',
  border: '0.5px solid #373375',
  boxShadow: '11px 11px 39px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  transform: 'translate(1%, -130%)',
});

const CustomSpan = styled('span')({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#000',
});

export const FormInput = ({
  name,
  control,
  label,
  type,
  fieldName,
  handleKeywordChange,
  subsourceHandleChange,
  formImputValue,
  setFormImputValue,
  portalEdicaseValue,
  setPortalEdicaseValue,
  setFocuseField,
}) => {
  const classes = useStyles();
  const fullUserData = useRecoilValue(fullUserSelectData);
  const userEmail = fullUserData.account?.email;

  const portalEdicaseData = useRecoilValue(portalEdicaseSelectData);

  useEffect(() => {
    setFormImputValue && userEmail && setFormImputValue(userEmail);
  }, [userEmail, setFormImputValue]);

  useEffect(() => {
    setPortalEdicaseValue && setPortalEdicaseValue(portalEdicaseData.value);
  }, [portalEdicaseData.value, setPortalEdicaseValue]);

  const [tipActive, setTipActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const showTip = () => {
    window.tipTimeout = setTimeout(() => setTipActive(true), 500);
  };

  const hideTip = () => {
    clearTimeout(window.tipTimeout);
    setTipActive(false);
  };

  const updateCoords = (e) => {
    if (e.pageX && e.pageY) {
      setCoords({ x: e.pageX, y: e.pageY });
    }
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth:
          name === 'page' || name === 'pageSize'
            ? '150px'
            : name === 'price'
            ? '400px'
            : '500px',
        justifyContent:
          name === 'page' || name === 'pageSize' ? 'start' : 'space-between',
        marginBottom: '20px',
      }}
    >
      <Grid
        sx={{
          marginRight: name === 'page' || name === 'pageSize' ? '5px' : '0px',
        }}
      >
        {fieldName}
      </Grid>

      <Grid item>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              className={classes.selectBlock}
              onMouseEnter={showTip}
              onMouseMove={updateCoords}
              onMouseLeave={hideTip}
              name={name}
              sx={{
                width:
                  name === 'page' || name === 'pageSize'
                    ? '110px'
                    : name === 'price'
                      ? { mobileS: '100px', tablet: '310px' }
                      : { mobileS: '200px', tablet: '410px' },
              }}
              type={type}
              helperText={error ? error.message : null}
              InputProps={{
                inputProps:
                  name === 'pageSize'
                    ? { min: '1', max: '20', step: '1' }
                    : { min: '1', max: '9999', step: '1' },
              }}
              size='small'
              error={!!error}
              onBlur={(e) => {
                if (e.target.name === 'subsourceInput') {
                  setTimeout(() => {
                    setFocuseField(false);
                  }, 300);
                }
              }}
              onFocus={(e) => {
                if (e.target.name === 'subsourceInput') {
                  setFocuseField(true);
                }
              }}
              onChange={(e) => {
                onChange(e);
                handleKeywordChange && handleKeywordChange(e);
                subsourceHandleChange && subsourceHandleChange(e);
                setFormImputValue && setFormImputValue(e.target.value);
                setPortalEdicaseValue && setPortalEdicaseValue(e.target.value);
              }}
              value={
                name === 'author'
                  ? formImputValue || ''
                  : name === 'subsourceInput'
                  ? portalEdicaseValue || ''
                  : value || ''
              }
              fullWidth
              label={label}
              variant='outlined'
            />
          )}
        />
      </Grid>
      {tipActive &&
        name === 'subsourceInput' &&
        portalEdicaseValue.length > 1 && (
          <CustomDiv style={{ top: `${coords.y}px`, left: `${coords.x}px` }}>
            <CustomSpan>{portalEdicaseValue}</CustomSpan>
          </CustomDiv>
        )}
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
  subsourceHandleChange: PropTypes.func,
  formImputValue: PropTypes.string,
  setFormImputValue: PropTypes.func,
  portalEdicaseValue: PropTypes.string,
  setPortalEdicaseValue: PropTypes.func,
  focused: PropTypes.bool,
  setFocuseField: PropTypes.func,
  sourceValue: PropTypes.number,
};
