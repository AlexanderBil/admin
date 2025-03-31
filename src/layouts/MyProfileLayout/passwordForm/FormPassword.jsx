import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './shema';
import PropTypes from 'prop-types';
import UserService from 'services/userService';
import { useSnackbar } from 'notistack';

export const FormPassword = ({ handleCloseModal }) => {
  const { handleSubmit, control, setValue, errData } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const [errorData, setErrorData] = useState();
  const service = new UserService();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    const sendData = () => {
      service
        .changePassword(data)
        .then(() =>
          enqueueSnackbar('Saved!', {
            variant: 'success',
            autoHideDuration: 2000,
          })
        )
        .then(() => handleCloseModal())
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };

    sendData();
  };

  return (
    <Box
      style={{
        display: 'grid',
        gridRowGap: '20px',
      }}
    >
      <Typography variant='h6'> Change password </Typography>

      <FormInput
        name='currentPassword'
        control={control}
        label='Current password'
        type='password'
        fieldName='Current password:'
      />

      <FormInput
        name='newPassword'
        control={control}
        label='New password'
        type='password'
        fieldName='New password:'
      />

      <FormInput
        name='verifyNewPassword'
        control={control}
        label='Confirm new password'
        type='password1'
        fieldName='Confirm new password:'
      />

      <Box
        sx={{
          display: 'flex',
          maxWidth: '260px',
          width: '100%',
          justifyContent: 'space-between',
          margin: '0 auto',
        }}
      >
        <Button
          sx={{ marginTop: '20px', width: '100px' }}
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
        >
          Save
        </Button>

        <Button
          color='error'
          sx={{ marginTop: '20px', width: '100px' }}
          onClick={() => handleCloseModal()}
          variant={'contained'}
        >
          Cancel
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}></Box>
      {errorData && (
        <div
          style={{
            color: 'red',
            maxWidth: '450px',
            textAlign: 'center',
          }}
        >
          {errorData.messages
            ? errorData.messages[0].value
            : errorData
              ? 'Error'
              : ''}
        </div>
      )}
    </Box>
  );
};

FormPassword.propTypes = {
  handleCloseModal: PropTypes.func,
};
