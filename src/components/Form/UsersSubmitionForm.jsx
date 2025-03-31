import { Button, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaToRequiredComment } from '../Form/schema';

import { Loader } from '../../components/Loader/Loader';
import {
  idAndStatusInfo,
  usersSubmitionResponseData,
} from 'store/usersSubmitionStore';
import { cancelOrApproveUsersSubmition } from '../../services/usersSubmitionService';

export const UsersSubmitionForm = () => {
  const [responseData, setResponseData] = useRecoilState(
    usersSubmitionResponseData
  );
  const [errData, setErrorData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const { userId, userStatus, formTitleName } = useRecoilValue(idAndStatusInfo);

  useEffect(() => {
    if (responseData.response?.status === 200) {
      setShowLoader(false);
    }
  }, [responseData]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schemaToRequiredComment),
  });

  const onSubmit = (data) => {
    const newData = {
      status: userStatus,
      comment: data.comment,
    };

    const sendData = async () => {
      await cancelOrApproveUsersSubmition(userId, newData)
        .then((response) => setResponseData((prev) => ({ ...prev, response })))
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };

    newData && setShowLoader(true);
    sendData();
  };

  return (
    <Box
      style={{
        display: 'grid',
        gridRowGap: '20px',
      }}
    >
      <Typography variant='h6'> {formTitleName} submission</Typography>

      <FormInput
        name='comment'
        control={control}
        label='Coment'
        type='text'
        fieldName='Comment*:'
      />

      <Button
        sx={{ marginTop: '20px', padding: '10px' }}
        onClick={handleSubmit(onSubmit)}
        variant={'contained'}
        disabled={showLoader ? true : false}
      >
        Submit
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {showLoader && <Loader />}
      </Box>
      {errData && (
        <div
          style={{
            color: 'red',
            maxWidth: '450px',
            textAlign: 'center',
          }}
        >
          {errData.errorDetails.join()}
        </div>
      )}
    </Box>
  );
};
