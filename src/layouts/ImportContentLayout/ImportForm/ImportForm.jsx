import React, { Suspense } from 'react';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  fullUserSelectData,
  localesData,
  portalEdicaseSelectData,
  sourceListState,
} from 'store/importContentStore';
import { useForm } from 'react-hook-form';
import { FormInput } from './form-components/FormInput';
import { FormInputDropdown } from './form-components/FormInputDropdown';
import { FormInputRadio } from './form-components/FormInputRadio';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, schemaSubsource } from './schema';
import { useDebounce } from 'hooks/useDebounce';
import {
  filtersEmailImportContent,
  importContentState,
} from 'store/importContentStore';
import { ImportFormFilterList } from './ImportFormFilterList';
import { Loader } from 'components/Loader/Loader';
import { batchImport } from 'services/importContentService';
import ImportFormModal from './ImportFormModal';
import SubsourceList from './SubsourceList';
import { useEffect } from 'react';
import { globalDetails } from 'store/invitationStore';
import { FormSwitcher } from './form-components/FormSwitcher';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  filterBoxWrapper: {
    marginBottom: '40px',
    border: '1px solid #949494',
    maxWidth: '1280px',
    borderRadius: '8px',
    padding: '20px 20px 20px 20px',
    [theme.breakpoints.down('tablet')]: {
      maxWidth: '400px',
      top: '135px',
      margin: '0 auto',
      position: 'fixed',
      left: '-120%',
    },
  },
  filterBoxWrapperActive: {
    marginBottom: '40px',
    border: '1px solid #949494',
    maxWidth: '1280px',
    borderRadius: '8px',
    padding: '20px 20px 20px 20px',
    [theme.breakpoints.down('tablet')]: {
      display: 'flex',
      zIndex: '100',
      position: 'absolute',
      left: 0,
      top: '135px',
      transition: ' all 350ms ease-out',
      backgroundColor: '#fff',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
      padding: '20px',
      borderRadius: '8px',
      margin: '15px'
    },
  },
  filterBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
    },
  },
  filterBoxLeft: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    width: '100%',
    marginRight: '20px',
    [theme.breakpoints.down('laptop')]: {
      marginRight: '0px',
    },
  },
  filterBoxRight: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('laptop')]: {
      maxWidth: '500px',
      width: '100%',
    },
    [theme.breakpoints.down('tablet')]: {
      marginBottom: '20px',
    },
  },
}));

export const modeList = [
  {
    label: 'Save',
    value: 'SAVE',
    tooltipValue: 'Save',
  },
  {
    label: 'Update',
    value: 'UPDATE',
    tooltipValue: 'Update',
  },
  {
    label: 'Save or Update',
    value: 'SAVE_OR_UPDATE',
    tooltipValue: 'Save or Update',
  },
];

const classificationList = [
  {
    label: 'Article',
    value: 'Article',
  },
  {
    label: 'Video',
    value: 'Video',
    disabledField: true,
  },
  {
    label: 'Audio',
    value: 'Audio',
    disabledField: true,
  },
  {
    label: 'Poster',
    value: 'Poster',
    disabledField: true,
  },
];

const ImportForm = ({ importForm }) => {
  const classes = useStyles();
  const { sourceList } = useRecoilValue(sourceListState);
  const { localesList } = useRecoilValue(localesData);
  const [showSubsourceInput, setShowSubsourceInput] = useState(false);
  const setPortalEdicaseData = useSetRecoilState(portalEdicaseSelectData);
  const [formImputValue, setFormImputValue] = useState('');
  const [portalEdicaseValue, setPortalEdicaseValue] = useState('');
  const [sourceValue, setSourceValue] = useState('');
  const [formSwitcherValue, setFormSwitcherValue] = useState(false);
  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';
  const refresh = useRecoilRefresher_UNSTABLE(importContentState);

  const [errData, setErrorData] = useState();
  const [batchImportData, setBatchImportData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [focuseField, setFocuseField] = useState(false);
  const [emailFilter, setEmailFilter] = useRecoilState(
    filtersEmailImportContent
  );
  const [fullUserData, setFullUserData] = useRecoilState(fullUserSelectData);
  const userId = fullUserData.account?.id;

  const currencyList = [
    {
      label: 'ALGO',
      value: 'ALGO',
    },
    {
      label: 'CHF',
      value: 'CHF',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: tokenName,
      value: 'ALGOTOKEN',
    },
    {
      label: 'USDT',
      value: 'USDT',
    },
    {
      label: 'USDC',
      value: 'USDC',
    },
    {
      label: 'ETH',
      value: 'ETH',
    },
    {
      label: 'BTC',
      value: 'BTC',
    },
  ];

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      isValidAuthor: userId,
    },
    resolver: yupResolver(!showSubsourceInput ? schema : schemaSubsource),
    context: { value: portalEdicaseValue, authorValue: userId },
  });

  useEffect(() => {
    sourceList.map((item) => {
      if (item.withSubsource && item.id === sourceValue) {
        setShowSubsourceInput(true);
      }
      if (!item.withSubsource && item.id === sourceValue) {
        setShowSubsourceInput(false);
      }
    });
  }, [sourceValue, sourceList]);

  const resetData = () => {
    reset();
    setErrorData('');
    setFormImputValue('');
    setPortalEdicaseValue('');
    setSourceValue('');
    setShowSubsourceInput(false);
    setFormSwitcherValue(false);
    setFullUserData({});
    setPortalEdicaseData((prev) => ({
      ...prev,
      value: '',
    }));
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    // reset();
    // setFormImputValue('');
    // setPortalEdicaseValue('');
    // setSourceValue('');
    // setFullUserData({});
    // setShowSubsourceInput(false);
    // setFormSwitcherValue(false);
    // setPortalEdicaseData((prev) => ({
    //   ...prev,
    //   value: '',
    // }));
    setTimeout(() => {
      refresh();
    }, 1500);
  };

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      setEmailFilter((prevState) => ({
        ...prevState,
        isShowFilterList: false,
      }));
    }
    e.target.value.length > 0 &&
      setEmailFilter((prevState) => ({
        ...prevState,
        keyword: e.target.value,
        isShowFilterList: true,
      }));
  };

  const subsourceHandleChange = (e) => {
    if (e.target.value.length === 0) {
      setPortalEdicaseData((prevState) => ({
        ...prevState,
        isShowFilterList: false,
      }));
    }
    e.target.value.length > 0 &&
      setPortalEdicaseData((prevState) => ({
        ...prevState,
        keyword: e.target.value,
        isShowFilterList: true,
      }));
  };

  const debounceSearch = useDebounce(handleChange, 500);

  const handleKeywordChange = (event) => {
    debounceSearch(event);
  };

  const onSubmit = (data) => {
    let sendData = {
      source: data.sources,
    };

    if (userId !== undefined) {
      sendData.authorId = userId;
    }

    if (data.healthCheck === true) {
      sendData.aiRequestOptions = {
        aiCategories: ['HEALTHCHECK'],
      };
    }

    if (portalEdicaseValue.length > 0) {
      sendData.importOptions = {
        ...sendData.importOptions,
        subSource: portalEdicaseValue,
      };
    }
    if (data.locales) {
      sendData.locale = data.locales;
    }
    if (data.price) {
      sendData.price = Number(data.price);
      sendData.currency = data.currency;
    }
    if (data.classification) {
      sendData.classification = data.classification;
    }
    if (data.page) {
      sendData.importOptions = {
        ...sendData.importOptions,
        page: Number(data.page),
      };
    }
    if (data.pageSize) {
      sendData.importOptions = {
        ...sendData.importOptions,
        pageSize: Number(data.pageSize),
      };
    }
    if (data.importMode) {
      sendData.importOptions = {
        ...sendData.importOptions,
        importMode: data.importMode,
      };
    }

    const sendDataHandler = async () => {
      setErrorData('');
      setIsOpenModal(true);
      await batchImport(sendData)
        .then((response) =>
          setBatchImportData((prev) => ({ ...prev, response }))
        )
        .catch((error) => {
          setErrorData(error.response.data);
        });
    };

    sendDataHandler();
  };

  return (
    <Box
      className={
        importForm ? classes.filterBoxWrapperActive : classes.filterBoxWrapper
      }
    >
      <Box className={classes.filterBox}>
        <Box className={classes.filterBoxLeft}>
          <FormInputDropdown
            name='sources'
            control={control}
            label='Sources'
            sourceList={sourceList}
            setSourceValue={setSourceValue}
          />

          {showSubsourceInput && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormInput
                focused={true}
                name='subsourceInput'
                control={control}
                label='Write or Select'
                type='text'
                fieldName='Subsource:'
                subsourceHandleChange={subsourceHandleChange}
                setPortalEdicaseValue={setPortalEdicaseValue}
                portalEdicaseValue={portalEdicaseValue}
                setFocuseField={setFocuseField}
              />
              {focuseField && (
                <Suspense fallback={<Loader />}>
                  <SubsourceList
                    sourceValue={sourceValue}
                    setFocuseField={setFocuseField}
                    portalEdicaseValue={portalEdicaseValue}
                  />
                </Suspense>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormInput
              name='author'
              control={control}
              label='Search & Select'
              type='text'
              fieldName='Author:'
              handleKeywordChange={handleKeywordChange}
              formImputValue={formImputValue}
              setFormImputValue={setFormImputValue}
            />
            {emailFilter.isShowFilterList && (
              <Suspense fallback={<Loader />}>
                <ImportFormFilterList />
              </Suspense>
            )}
          </Box>

          <FormInputDropdown
            name='locales'
            control={control}
            label='Locales'
            localesList={localesList}
          />

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <FormInput
              name='price'
              control={control}
              label='Min.1'
              type='number'
              fieldName='Price:'
            />
            <FormInputDropdown
              name='currency'
              control={control}
              label='1WMT'
              currencyList={currencyList}
            />
          </Box>
        </Box>

        <Box className={classes.filterBoxRight}>
          <Box
            sx={{
              display: 'flex',
              maxWidth: '400px',
              justifyContent: 'space-between',
            }}
          >
            <FormInput
              name='page'
              control={control}
              label='Page'
              type='number'
              fieldName='Page:'
            />

            <FormInput
              name='pageSize'
              control={control}
              label='PageSize'
              type='number'
              fieldName='Page size:'
            />
          </Box>

          <FormInputRadio
            name={'classification'}
            control={control}
            label={'Classification'}
            classificationList={classificationList}
          />

          <FormInputRadio
            name={'importMode'}
            control={control}
            label={'Import mode'}
            modeList={modeList}
          />

          <FormSwitcher
            control={control}
            name={'healthCheck'}
            formSwitcherValue={formSwitcherValue}
            setFormSwitcherValue={setFormSwitcherValue}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '200px',
          }}
        >
          <Button
            sx={{
              padding: '6px',
              width: '100%',
            }}
            onClick={handleSubmit(onSubmit)}
            variant={'contained'}
          >
            Import
          </Button>

          <Button
            onClick={resetData}
            sx={{ marginTop: '20px', padding: '6px', width: '100%' }}
            variant={'contained'}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {errData && (
        <div
          style={{
            color: 'red',
            maxWidth: '600px',
            textAlign: 'center',
            margin: '0 auto',
            marginTop: '15px',
          }}
        >
          {errData.errorDetails ? errData.errorDetails?.join() : errData.error}
        </div>
      )}
      <ImportFormModal open={isOpenModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default ImportForm;

ImportForm.propTypes = {
  importForm: PropTypes.bool,
};
