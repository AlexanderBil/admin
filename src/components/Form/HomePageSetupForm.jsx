import { Button, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import HomePageSetupService from 'services/homePageSetupService';
import { Loader } from '../../components/Loader/Loader';
import {
  homePageResponseData,
  lastEnteredData,
} from 'store/homePageSetupStore';
import PropTypes from 'prop-types';
import {
  inputsData,
  getFilteredEditorialAndAdvertorialData,
  resData,
} from '../../store/homePageSetupStore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  editorialBox: {
    display: 'flex',
    padding: '20px 0 20px 0',
    alignItems: 'flex-end',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  advertorialBox: {
    display: 'flex',
    padding: '20px 0 20px 0',
    alignItems: 'flex-end',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  button: {
    marginLeft: '30px',
    padding: '7px 25px',
    [theme.breakpoints.down('tablet')]: {
      marginLeft: '0px',
      marginTop: '15px'
    },
  },
}));

export const HomePageSetupForm = () => {
  const classes = useStyles();
  const service = new HomePageSetupService();

  const [responseData, setResponseData] = useRecoilState(homePageResponseData);
  const [lastInputData, setLastInputData] = useRecoilState(lastEnteredData);

  const [errData, setErrorData] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [availableEditorial, setAvailableEditorial] = useState(false);
  const [availableAdvertorial, setAvailableAdvertorial] = useState(false);
  const [clearInputsData, setClearInputsData] = useState(false);
  const [inputData, setInputData] = useRecoilState(inputsData);

  const setResultData = useSetRecoilState(resData);

  const [newData, setNewData] = useRecoilState(
    getFilteredEditorialAndAdvertorialData
  );

  useEffect(() => {
    errData &&
      setResultData((prev) => ({
        editorial: prev.editorial.filter(
          (el) => !lastInputData.editorialData.includes(el)
        ),
        advertorial: prev.advertorial.filter(
          (el) => !lastInputData.advertorialData.includes(el)
        ),
      }));
    setTimeout(() => {
      setErrorData('');
    }, 2000);
  }, [responseData, errData]);

  const ed = inputData?.editorialLabel
    .replace(/\s+/g, '')
    .split(',')
    .map((item) => Number(item));

  const ad = inputData?.advertorialLabel
    .replace(/\s+/g, '')
    .split(',')
    .map((item) => Number(item));

  const setLabelDataHandler = () => {
    setResultData((prev) => ({
      ...prev,
      editorial: ed[0] === 0 ? [...prev.editorial] : [...prev.editorial, ...ed],
      advertorial:
        ad[0] === 0 ? [...prev.advertorial] : [...prev.advertorial, ...ad],
    }));

    setLastInputData((prev) => ({
      ...prev,
      editorialData: ed && ed,
      advertorialData: ad && ad,
    }));
  };

  const editorialHandlerDelete = () => {
    const editorialObj = {};
    if (typeof inputData.editorialLabel === 'string') {
      editorialObj.contentsIds = inputData.editorialLabel
        .replace(/\s+/g, '')
        .split(',')
        .map((item) => Number(item));
    }
    editorialObj.viewType = 'HOME_EDITORIAL';

    const deleteData = async () => {
      await service
        .deleteEditorialAndAdvertorialId(editorialObj)
        .then((response) => setResponseData((prev) => ({ ...prev, response })))
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };
    deleteData();

    setResultData((prev) => ({
      ...prev,
      editorial:
        ed[0] !== 0
          ? newData.res.editorialLabel.filter((e) => !ed.includes(e))
          : [],
    }));
    setInputData((prev) => ({ ...prev, deleteDataE: true, ed: ed }));
    setClearInputsData(true);
    reset();
    setTimeout(() => {
      setInputData((prev) => ({
        ...prev,
        editorialLabel: '',
      }));
    }, 1000);
  };

  const advertorialHandlerDelete = () => {
    const advertorialObj = {};
    if (typeof inputData.advertorialLabel === 'string') {
      advertorialObj.contentsIds = inputData.advertorialLabel
        .replace(/\s+/g, '')
        .split(',')
        .map((item) => Number(item));
    }
    advertorialObj.viewType = 'HOME_ADVERTORIAL';

    const deleteData = async () => {
      await service
        .deleteEditorialAndAdvertorialId(advertorialObj)
        .then((response) => setResponseData((prev) => ({ ...prev, response })))
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };
    deleteData();

    setResultData((prev) => ({
      ...prev,
      advertorial:
        ad[0] !== 0
          ? newData.res.advertorialLabel.filter((e) => !ad.includes(e))
          : [],
    }));
    setInputData((prev) => ({ ...prev, deleteDataA: true, ad: ad }));
    setClearInputsData(true);
    reset();
    setTimeout(() => {
      setInputData((prev) => ({
        ...prev,
        advertorialLabel: '',
      }));
    }, 1000);
  };

  useEffect(() => {
    if (responseData.response?.status === 201 || errData) {
      setShowLoader(false);
    }
  }, [responseData, errData]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({});

  const onSubmit = (data) => {
    const editorial = data.editorial
      ? data.editorial.replace(/\s+/g, '').split(',')
      : [];
    const advertorial = data.advertorial
      ? data.advertorial.replace(/\s+/g, '').split(',')
      : [];

    const edObj = editorial.map((item) => {
      return {
        contentId: Number(item),
        viewType: 'HOME_EDITORIAL',
      };
    });

    const adObj = advertorial.map((item) => {
      return {
        contentId: Number(item),
        viewType: 'HOME_ADVERTORIAL',
      };
    });

    const editorialAndAdvertorialState = [...edObj, ...adObj];

    const sendData = async () => {
      await service
        .setEditorialAndAdvertorialId(editorialAndAdvertorialState)
        .then((response) => setResponseData((prev) => ({ ...prev, response })))
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };

    editorialAndAdvertorialState && setShowLoader(true);
    sendData();
    reset();
    setClearInputsData(true);
    setInputData((prev) => ({ ...prev, setData: true }));
    setLabelDataHandler();

    setTimeout(() => {
      setInputData((prev) => ({
        ...prev,
        editorialLabel: '',
        advertorialLabel: '',
      }));
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        style={{
          maxWidth: '750px',
          width: '100%',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          padding: '20px',
        }}
      >
        <Typography sx={{ marginTop: '15px' }} variant='h6'>
          {' '}
          Home Page Setup{' '}
        </Typography>

        <Box className={classes.editorialBox}>
          <FormInput
            width='450px'
            name='editorial'
            control={control}
            label={newData.res.editorialLabel?.join(', ')}
            type='text'
            fieldName='Editorial:'
            setAvailable={setAvailableEditorial}
            clearInputsData={clearInputsData}
            setClearInputsData={setClearInputsData}
          />
          <Button
            className={classes.button}
            onClick={editorialHandlerDelete}
            variant='contained'
          >
            Delete
          </Button>
        </Box>

        <Box className={classes.advertorialBox}>
          <FormInput
            width='450px'
            name='advertorial'
            control={control}
            label={newData.res.advertorialLabel?.join(', ')}
            type='text'
            fieldName='Advertorial:'
            setAvailable={setAvailableAdvertorial}
            clearInputsData={clearInputsData}
            setClearInputsData={setClearInputsData}
          />
          <Button
            className={classes.button}
            onClick={advertorialHandlerDelete}
            variant='contained'
          >
            Delete
          </Button>
        </Box>

        <Button
          sx={{ marginTop: '20px', padding: '10px', width: '100%' }}
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
          disabled={
            showLoader || (!availableEditorial && !availableAdvertorial)
              ? true
              : false
          }
        >
          Save
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {showLoader && <Loader />}
          {errData && (
            <div
              style={{
                color: 'red',
                maxWidth: '450px',
                textAlign: 'center',
                margin: '10px 20px',
              }}
            >
              {errData.message}
            </div>
          )}
        </Box>
      </Box>
    </form>
  );
};

HomePageSetupForm.propTypes = {
  editorialLabelState: PropTypes.array,
  advertorialLabelState: PropTypes.array,
  setEditorialLabelState: PropTypes.func,
  setAdvertorialLabelState: PropTypes.func,
  editorialLabel: PropTypes.array,
};
