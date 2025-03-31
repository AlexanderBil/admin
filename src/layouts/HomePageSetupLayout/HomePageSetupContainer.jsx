import React, { useEffect, useState } from 'react';
import { HomePageSetupForm } from 'components/Form/HomePageSetupForm';
import { useRecoilState } from 'recoil';
import {
  homePageResponseData,
} from 'store/homePageSetupStore';
import { CustomSnackbar } from 'components/CustomSnackbar/CustomSnackbar';

const HomePageSetupContainer = () => {
  const [responseData, setResponseData] = useRecoilState(homePageResponseData);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (responseData.response?.status === 201) {
      setStatus(200);
      setMessage('Data added successfully!');
      setResponseData({});
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
    if (responseData.response?.status === 204) {
      setStatus(200);
      setMessage('Delete successfully!');
      setResponseData({});
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
  }, [responseData]);

  return (
    <>
      <HomePageSetupForm/>
      <CustomSnackbar message={message} status={status} />
    </>
  );
};

export default HomePageSetupContainer;
