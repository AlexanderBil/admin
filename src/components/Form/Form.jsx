import { Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { FormInputCheckbox } from './form-components/FormInputCheckbox';
import { FormInputDropdown } from './form-components/FormInputDropdown';
import { FormInputMultiCheckbox } from './form-components/FormInputMultiCheckbox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box } from '@mui/system';
import { sendInvitetion } from 'services/accessRequestService';
import { invitationResponseData } from '../../store/accessRequestStore';
import { subRoleToogle } from '../../store/accessRequestStore';
import { useEffect, useState } from 'react';
import { useIncentivesDataHandler } from './utilsFunctions';
import PropTypes from 'prop-types';
import { Loader } from '../../components/Loader/Loader';

export const Form = ({ defaultData }) => {
  const [responseData, setInvitationData] = useRecoilState(
    invitationResponseData
  );
  const roleToggle = useRecoilValue(subRoleToogle);
  const [errData, setErrorData] = useState();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (responseData.response?.status === 200) {
      setShowLoader(false);
    }
  }, [responseData]);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      email: defaultData.email,
      role: defaultData.role,
      subRole: defaultData.subRole,
      algoAmount: 0,
      assetAmount: 0,
    },
  });

  const onSubmit = (data) => {
    let newData;

    if (!data.comment) {
      Reflect.deleteProperty(data, 'comment');
    }

    if (!data.algoAmount || data.algoAmount == 0) {
      Reflect.deleteProperty(data, 'algoAmount');
    }

    if (!data.assetAmount || data.assetAmount == 0) {
      Reflect.deleteProperty(data, 'assetAmount');
    }

    if (!data.subRole) {
      Reflect.deleteProperty(data, 'subRole');
      newData = data;
    } else {
      newData = data;
    }

    Object.keys(newData).map((key) => {
      if (key === 'algoAmount') {
        return (newData[key] = Number(data.algoAmount));
      }
      if (key === 'assetAmount') {
        return (newData[key] = Number(data.assetAmount));
      }
    });

    const sendData = async () => {
      await sendInvitetion(newData)
        .then((response) =>
          setInvitationData((prev) => ({ ...prev, response }))
        )
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
      <Typography variant='h6'> Create invitation </Typography>

      <FormInput
        name='email'
        control={control}
        label='Email'
        type='text'
        fieldName='Email*:'
      />

      <FormInputDropdown name='role' control={control} label='Role' />

      <FormInputMultiCheckbox
        name={'subRole'}
        control={control}
        label={''}
        roleValue={roleToggle}
        setValue={setValue}
        subRole={defaultData ? defaultData.subRole : ''}
      />

      <FormInput
        name='algoAmount'
        control={control}
        label={`Max ${useIncentivesDataHandler()[0]}`}
        type='number'
        fieldName='Incentives (ALGO):'
      />

      <FormInput
        name='assetAmount'
        control={control}
        label={`Max ${useIncentivesDataHandler()[1]}`}
        type='number'
        fieldName={`Incentives (${defaultData.incentiveDetailsData.unitName}):`}
      />

      <FormInputCheckbox
        control={control}
        setValue={setValue}
        name={'silently'}
        label={'Silently (no notification)'}
      />

      <FormInput
        name='comment'
        control={control}
        label='Comment'
        type='text'
        fieldName='Comment:'
      />

      <Button
        sx={{
          marginTop: '20px',
          padding: '10px',
          width: '100%',
        }}
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

Form.propTypes = {
  defaultData: PropTypes.object.isRequired,
};
