import { Button, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import DeploymentRequestService from 'services/deploymentRequestService';
import {
  deploymentResponseData,
  openModal,
  idInfo,
} from 'store/deploymentRequestStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';

export const DeploymentRequestForm = () => {
  const [responseData, setResponseData] = useRecoilState(
    deploymentResponseData
  );
  const [errData, setErrorData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const { id, action } = useRecoilValue(idInfo);
  const setOpen = useSetRecoilState(openModal);
  const service = new DeploymentRequestService();

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
    resolver: action === 'decline' ? yupResolver(schema) : null,
    mode: 'onChange',
  });

  const deployHandler = async () => {
    setShowLoader(true);
    await service
      .deploymentRequest(id)
      .then((response) => {
        setResponseData((prev) => ({
          ...prev,
          response,
        }));
        setShowLoader(false);
      })
      .catch((error) => {
        setErrorData(error.response.status);
        setShowLoader(false);
      });
  };

  const onSubmit = (data) => {
    setShowLoader(true);
    const sendData = async () => {
      await service
        .reviewContent(id, action, data)
        .then((response) => {
          setResponseData((prev) => ({
            ...prev,
            response,
          }));
          setShowLoader(false);
        })
        .catch((error) => {
          setErrorData(error.response.status);
          setShowLoader(false);
        });
    };
    sendData();
  };

  return action === 'decline' ? (
    <Box
      style={{
        display: 'grid',
        gridRowGap: '20px',
      }}
    >
      <Typography variant='h6'>
        {' '}
        Are you sure to {action[0] + action.substring(1)}?{' '}
      </Typography>

      <FormInput
        name='details'
        control={control}
        label='Coment'
        type='text'
        fieldName='Comment*:'
      />

      <Button
        sx={{ padding: '10px 40px', objectFit: 'contain' }}
        onClick={handleSubmit(onSubmit)}
        variant={'contained'}
        disabled={showLoader ? true : false}
      >
        OK
      </Button>
      {showLoader && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
          }}
        >
          <Loader />
        </Box>
      )}

      {errData && (
        <div
          style={{
            color: 'red',
            maxWidth: '450px',
            textAlign: 'center',
          }}
        >
          Error Status: {errData}
        </div>
      )}
    </Box>
  ) : (
    <Box
      sx={{
        display: 'grid',
        textAlign: 'center',
        minWidth: { mobileS: 'auto', tablet: '300px' },
      }}
    >
      <Typography
        sx={{ fontSize: '18px', fontWeight: '500', marginTop: '10px' }}
      >
        {' '}
        Are you sure to {action[0] + action.substring(1)}?{' '}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '200px',
          margin: '0 auto',
        }}
      >
        <Button
          sx={{ marginTop: '15px', padding: '10px 30px' }}
          onClick={
            action === 'approve'
              ? handleSubmit(onSubmit)
              : action === 'deploy'
                ? () => deployHandler()
                : ''
          }
          variant={'contained'}
        >
          Yes
        </Button>

        <Button
          sx={{ marginTop: '15px', padding: '10px 30px' }}
          onClick={() => setOpen((prev) => ({ ...prev, open: false }))}
          color='error'
          variant={'contained'}
        >
          No
        </Button>

        {showLoader && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
            }}
          >
            <Loader />
          </Box>
        )}
      </Box>
      {errData && (
        <div
          style={{
            color: 'red',
            maxWidth: '450px',
            textAlign: 'center',
          }}
        >
          Error Status: {errData}
        </div>
      )}
    </Box>
  );
};
