import { Button, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaToRequiredComment, schemaToNft } from '../Form/schema';
import { voidPayment, completePayment } from 'services/nftSponsorshipService';
import { Loader } from '../../components/Loader/Loader';

import {
  contentIdAndStatusInfo,
  filterByEmail,
  fullDataFromUser,
  nftResponseData,
} from 'store/nftSponsorshipStore';
import { FormInputCheckbox } from './form-components/FormInputCheckbox';
import { useDebounce } from 'hooks/useDebounce';
import { FundsFormFilterList } from './form-components/FundsFormFilterList';

export const NftSponsorshipForm = () => {
  const [responseData, setResponseData] = useRecoilState(nftResponseData);
  const [errData, setErrorData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const { id, formTitle, isVoidForm } = useRecoilValue(contentIdAndStatusInfo);
  const [emailFilter, setEmailFilter] = useRecoilState(filterByEmail);
  const fullUserData = useRecoilValue(fullDataFromUser);

  const [showInput, setShowInput] = useState(false);

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

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(isVoidForm ? schemaToRequiredComment : schemaToNft),
  });

  const debounceSearch = useDebounce(handleChange, 500);

  const handleKeywordChange = (event) => {
    debounceSearch(event);
  };

  const onSubmit = (data) => {
    const comment = data.comment;
    const newData = {
      description: data.comment || '',
      accountId: fullUserData.account?.id,
    };

    if (data.transferNft) {
      newData.transferNft = data.transferNft;
    }
    if (data.dealTransactionId) {
      newData.dealTransactionId = data.dealTransactionId;
    }

    const sendVoidData = async () => {
      await voidPayment(id, comment)
        .then((response) => setResponseData((prev) => ({ ...prev, response })))
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };

    const sendCompletedData = async () => {
      await completePayment(id, newData)
        .then((response) => setResponseData((prev) => ({ ...prev, response })))
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };

    comment && setShowLoader(true);
    newData && setShowLoader(true);

    isVoidForm ? sendVoidData() : sendCompletedData();
  };

  return (
    <>
      {isVoidForm ? (
        <Box
          style={{
            display: 'grid',
            gridRowGap: '20px',
          }}
        >
          <Typography variant='h6'> {formTitle} </Typography>
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
            disabled={showLoader && !errData ? true : false}
          >
            Submit
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {showLoader && !errData && <Loader />}
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
      ) : (
        <Box
          style={{
            display: 'grid',
            gridRowGap: '20px',
          }}
        >
          <Typography variant='h6'> {formTitle} </Typography>

          <FormInputCheckbox
            control={control}
            setValue={setValue}
            name={'transferNft'}
            label={'Transfer NFT'}
            setShowInput={setShowInput}
          />

          <FormInput
            name='email'
            control={control}
            label='Email'
            type='text'
            fieldName='Email*:'
            handleKeywordChange={handleKeywordChange}
            isNeedSetEmail={true}
            isFunds={false}
          />

          {emailFilter.isShowFilterList ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <FundsFormFilterList isFunds={false} />
            </Box>
          ) : (
            fullUserData.account && (
              <Box sx={{ marginLeft: '170px' }}>
                Account id is:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {fullUserData.account?.id}
                </span>
              </Box>
            )
          )}

          <FormInput
            name='dealTransactionId'
            control={control}
            label='NFT transfer TX id:'
            type='text'
            fieldName='NFT transfer TX id:'
            disabled={showInput && true}
          />

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
            disabled={showLoader && !errData ? true : false}
          >
            Submit
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {showLoader && !errData && <Loader />}
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
      )}
    </>
  );
};
