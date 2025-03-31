import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';

import { CustomizedSwitches } from 'components/Form/form-components/StyledSwitch';
import ContentTypeTabs from 'components/ContentTypeTabs/ContentTypeTabs';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allUsersFiltersState,
  allUsersState,
  authorNameState,
  contentFiltersState,
  dataFromSelectEmailContent,
  localesState,
  localeState,
  topAccountState,
} from 'store/contentStore';
import ContentAvatar from 'components/ContentAvatar/ContentAvatar';
import nftLogo from '../../images/nftLogo.svg';
import mpLogo from '../../images/mpLogo.svg';
import odLogo from '../../images/odLogo.svg';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { filtersByEmailContent } from 'store/contentStore';
import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';
import ContentFilterWrapper from './ContentFilterWrapper';
import { sourceListState } from 'store/importContentStore';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('laptop')]: {
      position: 'fixed',
      top: '108px',
      left: '-100%',
    },
  },
  filterContainerActive: {
    display: 'flex',
    zIndex: '100',
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: '108px',
    transition: ' all 350ms ease-out',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    padding: '20px',
    borderRadius: '8px'
  },
}));

const addOptions = [
  { value: 'all', label: 'All types' },
  { value: '', label: 'Regular' },
  { value: 'Advertorial', label: 'Advertorial' },
];

const aiControlOptions = [
  {
    label: 'Safe',
    value: 'Safety',
  },
  {
    label: 'Unsafe',
    value: 'NotSafety',
  },
  {
    label: 'Warning',
    value: 'Warning',
  },
];

const ContentFilter = ({ sidebarFilter }) => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(contentFiltersState);
  const [languageFilter, setLanguageFilter] = useRecoilState(localeState);
  const allUsersFilters = useRecoilValue(allUsersFiltersState);
  const { adOptions } = filters;
  const { topAccountData } = useRecoilValue(topAccountState);
  const { allUsers } = useRecoilValue(allUsersState);
  const { keyword } = allUsersFilters;
  const [searchInput, setSearchInput] = useState(keyword);
  const { localesData } = useRecoilValue(localesState);
  const { sourceList } = useRecoilValue(sourceListState);
  const [emailFilterContent, setEmailFilterContent] = useRecoilState(
    filtersByEmailContent
  );
  const setAuthorName = useSetRecoilState(authorNameState);
  const [fullUserData, setFullUserData] = useRecoilState(
    dataFromSelectEmailContent
  );

  const emailData = fullUserData.account?.email;

  const sourceListData = [{ id: 0, name: 'not selected' }, ...sourceList];

  useEffect(() => {
    setSearchInput(emailData);
    if (keyword.length === 0) {
      setSearchInput('');
    }
  }, [emailData, keyword]);

  useEffect(() => {
    if (searchInput === '') {
      setEmailFilterContent((prev) => ({ ...prev, isShowFilterList: false }));
      setFullUserData({});
    }
  }, [searchInput]);

  const handleChange = ({ target: { name, value } }) => {
    if (value === 'Advertorial') {
      setFilters((prevState) => ({
        ...prevState,
        page: 0,
        [name]: ['Advertorial'],
      }));
    }
    if (value === '') {
      setFilters((prevState) => ({
        ...prevState,
        page: 0,
        [name]: [],
      }));
    }
    if (value === 'all') {
      let cloneFilters = filters;
      const { adOptions, ...newObj } = cloneFilters;
      setFilters(newObj);
    }
  };

  const handleSourceChange = ({ target: { name, value } }) => {
    if (value === 0) {
      let cloneFilters = filters;
      const { originSourceIds, ...newObj } = cloneFilters;
      setFilters(newObj);
    } else {
      setFilters((prevState) => ({
        ...prevState,
        [name]: [value],
      }));
    }
  };

  const handleChangeLanguageFilter = ({ target: { name, value } }) => {
    setLanguageFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetAiFilterHandler = () => {
    let cloneFilters = filters;
    const { healthCheck, ...newObj } = cloneFilters;
    setFilters(newObj);
  };

  useEffect(() => {
    if (
      filters.healthCheck?.statuses &&
      filters.healthCheck.statuses.length === 0
    ) {
      resetAiFilterHandler();
    }
  }, [filters.healthCheck?.statuses]);

  const handleChangeAiFilter = (value) => {
    const isPresent =
      filters.healthCheck?.statuses &&
      filters.healthCheck.statuses.indexOf(value);
    if (filters.healthCheck?.statuses && isPresent !== -1) {
      const remaining = filters.healthCheck.statuses.filter(
        (item) => item !== value
      );
      setFilters((prevState) => ({
        ...prevState,
        healthCheck: {
          statuses: remaining,
        },
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        healthCheck: {
          statuses: prevState.healthCheck?.statuses
            ? [...prevState.healthCheck.statuses, value]
            : [value],
        },
      }));
    }
  };

  const handleChangeAllUsersFilter = (e) => {
    e.target.value.length > 0 &&
      setEmailFilterContent((prevState) => ({
        ...prevState,
        keyword: e.target.value,
        isShowFilterList: true,
      }));
  };

  const debounceSearch = useDebounce(handleChangeAllUsersFilter, 700);

  const handleKeywordChange = (event) => {
    setSearchInput(event.target.value);
    debounceSearch(event);
  };

  const getAuthorContentHandler = (id) => {
    setFilters((prevState) => ({
      ...prevState,
      creatorId: id,
    }));
  };

  const setAuthorNameHandler = (first, last) => {
    setAuthorName((prev) => ({
      ...prev,
      first,
      last,
    }));
  };

  function checkboxGroup() {
    return (
      <FormControl component='span'>
        <FormLabel id='role-label'></FormLabel>
        <RadioGroup
          aria-labelledby='role-label'
          name='adOptions'
          value={adOptions ? adOptions.toString() : 'all'}
          onChange={handleChange}
        >
          {addOptions.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio size={'small'} />}
              label={label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  return (
    <Grid
      item
      className={
        sidebarFilter ? classes.filterContainerActive : classes.filterContainer
      }
      mobileS={11.5}
      laptop={2.2}
    >
      <Box
        sx={{
          border: '1px solid 	#DCDCDC',
          padding: '5px',
          borderRadius: '5px',
          marginBottom: '40px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component='img'
              sx={{
                height: '30px',
                width: '30px',
                objectFit: 'contain',
                marginRight: '10px',
              }}
              alt='picture'
              src={nftLogo}
            />
            <Typography>NFTs</Typography>
          </Box>
          <CustomizedSwitches
            from='contentFilterNft'
            isCheked={filters.withNft || false}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component='img'
              sx={{
                height: '30px',
                width: '30px',
                objectFit: 'contain',
                marginRight: '10px',
              }}
              alt='picture'
              src={mpLogo}
            />
            <Typography>Media Passport</Typography>
          </Box>
          <CustomizedSwitches
            from='contentFilterMp'
            isCheked={filters.withPassport || false}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component='img'
              sx={{
                height: '30px',
                width: '30px',
                objectFit: 'contain',
                marginRight: '10px',
              }}
              alt='picture'
              src={odLogo}
            />
            <Typography>Drafts</Typography>
          </Box>

          <CustomizedSwitches
            from='contentFilterDraft'
            isCheked={filters.statuses || false}
          />
        </Box>
      </Box>

      <FormControl size='small' sx={{ minWidth: 130, marginBottom: '25px' }}>
        <InputLabel sx={{ paddingRight: '5px' }} id='demo-simple-select-label'>
          Language
        </InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={languageFilter.locale}
          name='locale'
          label='Language'
          onChange={handleChangeLanguageFilter}
        >
          {localesData.map((item) => (
            <MenuItem key={item.label} value={item.isoCode}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size='small' sx={{ minWidth: 130, marginBottom: '25px' }}>
        <InputLabel id='demo-simple-select-label'>Sources</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={filters.originSourceIds ? filters.originSourceIds[0] : 0}
          name='originSourceIds'
          label='Sources'
          onChange={handleSourceChange}
        >
          {sourceListData.map((item) => (
            <MenuItem
              sx={{
                fontStyle: item.name === 'not selected' ? 'italic' : 'normal',
              }}
              key={item.id}
              value={item.id}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          border: '1px solid 	#DCDCDC',
          padding: '5px',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
        size={'small'}
        variant={'outlined'}
      >
        <FormLabel component='legend'>AI Content Quality Check</FormLabel>
        <Box>
          {aiControlOptions.map((option) => {
            return (
              <FormControlLabel
                sx={{ marginRight: '25px' }}
                key={option.value}
                control={
                  <Checkbox
                    checked={
                      filters.healthCheck?.statuses
                        ? filters.healthCheck.statuses.includes(option.value)
                        : false
                    }
                    onChange={() => handleChangeAiFilter(option.value)}
                  />
                }
                label={option.label}
              />
            );
          })}
          <Button
            sx={{ padding: '5px 30px' }}
            onClick={() => resetAiFilterHandler()}
            variant='outlined'
          >
            Reset
          </Button>
        </Box>
      </FormControl>

      <ContentTypeTabs checkboxGroup={checkboxGroup} />


      <ContentAvatar topAccountData={topAccountData} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '30px',
          width: '100%',
        }}
      >
        <OutlinedInput
          sx={{ height: '45px', marginBottom: '15px' }}
          name='keyword'
          placeholder='Find author by email'
          startAdornment={
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          }
          value={searchInput || ''}
          onChange={handleKeywordChange}
        />

        {emailFilterContent.isShowFilterList && (
          <Suspense fallback={<Loader />}>
            <ContentFilterWrapper />
          </Suspense>
        )}
      </Box>
      {keyword === allUsers[0]?.email && (
        <Avatar
          onClick={() => {
            getAuthorContentHandler(allUsers[0]?.id);
            setAuthorNameHandler(allUsers[0]?.firstName, allUsers[0]?.lastName);
          }}
          sx={{
            cursor: 'pointer',
            width: 45,
            height: 45,
          }}
          alt={allUsers[0]?.firstName}
          src={allUsers[0]?.thumbnailUrl}
        >
          {`${allUsers[0]?.firstName[0] || ''}${
            allUsers[0]?.lastName[0] || ''
          }`}
        </Avatar>
      )}
    </Grid>
  );
};

export default ContentFilter;

ContentFilter.propTypes = {
  sidebarFilter: PropTypes.bool,
};
