import { Button, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FundsFormFilterList } from './form-components/FundsFormFilterList';
import { FormInput } from './form-components/FormInput';
import { FormInputCheckbox } from './form-components/FormInputCheckbox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { globalDetails } from '../../store/invitationStore';

import {
  filtersByEmail,
  fullDataFromSelectEmail,
  sendFundsResponseData,
} from 'store/sendFundsStore';
import { useDebounce } from 'hooks/useDebounce';
import { sendFunds } from '../../services/sendFundsService';
import { Loader } from '../../components/Loader/Loader';

export const SendFundsForm = () => {
  const [responseData, setResponseData] = useRecoilState(sendFundsResponseData);
  const [errData, setErrorData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [emailFilter, setEmailFilter] = useRecoilState(filtersByEmail);
  const fullUserData = useRecoilValue(fullDataFromSelectEmail);

  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';

  const handleChange = (e) => {
    setEmailFilter((prevState) => ({
      ...prevState,
      keyword: e.target.value,
      isShowFilterList: true,
    }));
  };

  useEffect(() => {
    if (responseData.response?.status === 200) {
      setShowLoader(false);
    }
  }, [responseData]);

  const debounceSearch = useDebounce(handleChange, 500);

  const handleKeywordChange = (event) => {
    debounceSearch(event);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newData = {
      comment: data.comment || '',
      targetAccountId: fullUserData.account.id,
      algoAmount: '',
      assetAmount: '',
    };

    if (data.silently) {
      newData.optInAsset = data.silently;
    }

    if (!data.algoAmount || data.algoAmount == 0) {
      Reflect.deleteProperty(newData, 'algoAmount');
    }

    if (!data.assetAmount || data.assetAmount == 0) {
      Reflect.deleteProperty(newData, 'assetAmount');
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
      await sendFunds(newData)
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
      <Typography variant='h6'> Send funds </Typography>

      <FormInput
        name='email'
        control={control}
        label='Email'
        type='text'
        fieldName='Email*:'
        handleKeywordChange={handleKeywordChange}
        isNeedSetEmail={true}
        isFunds={true}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {emailFilter.isShowFilterList && <FundsFormFilterList isFunds={true} />}
      </Box>

      <FormInput
        name='algoAmount'
        control={control}
        label={'Max - 5'}
        type='number'
        fieldName='Incentives (ALGO):'
      />

      <FormInput
        name='assetAmount'
        control={control}
        label={'Max - 10000'}
        type='number'
        fieldName={`Incentives (${tokenName}):`}
      />

      <FormInputCheckbox
        control={control}
        setValue={setValue}
        name={'silently'}
        label={'Opting in'}
      />

      <FormInput
        name='comment'
        control={control}
        label='Comment'
        type='text'
        fieldName='Comment:'
      />

      <Button
        sx={{ marginTop: '20px', padding: '10px' }}
        onClick={handleSubmit(onSubmit)}
        variant={'contained'}
        disabled={
          !Object.keys(fullUserData).length || showLoader ? true : false
        }
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
