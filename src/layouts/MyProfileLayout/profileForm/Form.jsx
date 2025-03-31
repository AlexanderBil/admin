import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './shema';
import PropTypes from 'prop-types';
import UserService from 'services/userService';
import { useSnackbar } from 'notistack';

export const Form = ({
  user,
  setUser,
  isEditing,
  resetValue,
  setResetValue,
  saveValue,
  setSaveValue,
}) => {
  const { handleSubmit, control, setValue, errData } = useForm({
    defaultValues: {
      first: user.first,
      last: user.last,
      email: user.email,
    },
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const [errorData, setErrorData] = useState();
  const service = new UserService();

  const onSubmit = (data) => {
    const sendData = () => {
      service
        .updateUserData(data)
        .then((response) => {
          setUser((prev) => ({
            ...prev,
            first: response.accountDto.first,
            last: response.accountDto.last,
          }));
          return enqueueSnackbar('Saved!', {
            variant: 'success',
            autoHideDuration: 2000,
          });
        })
        .catch((error) => {
          setErrorData(error.response);
        });
    };

    sendData();
  };

  useEffect(() => {
    saveValue && handleSubmit(onSubmit)();
    setSaveValue(false);
  }, [saveValue, handleSubmit]);

  return (
    <Box
      style={{
        display: 'grid',
        gridRowGap: '8px',
      }}
    >
      <FormInput
        name='first'
        control={control}
        label=''
        type='text'
        fieldName='First Name:'
        readOnly={!isEditing}
        defaultValues={user.first}
        resetValue={resetValue}
        setResetValue={setResetValue}
      />

      <FormInput
        name='last'
        control={control}
        label=''
        type='text'
        fieldName='Last Name:'
        readOnly={!isEditing}
        defaultValues={user.last}
        resetValue={resetValue}
        setResetValue={setResetValue}
      />

      <FormInput
        name='email'
        control={control}
        label=''
        type='text'
        fieldName='Email:'
        readOnly={true}
        defaultValues={user.email}
        resetValue={resetValue}
        setResetValue={setResetValue}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}></Box>
      {errorData && (
        <div
          style={{
            color: 'red',
            maxWidth: '450px',
            textAlign: 'center',
          }}
        >
          {errorData.errorDetails.join()}
        </div>
      )}
    </Box>
  );
};

Form.propTypes = {
  user: PropTypes.object,
  isEditing: PropTypes.bool,
  resetValue: PropTypes.bool,
  setResetValue: PropTypes.func,
  saveValue: PropTypes.bool,
  setSaveValue: PropTypes.func,
  setUser: PropTypes.func,
};
