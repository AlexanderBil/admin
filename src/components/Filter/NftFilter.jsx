import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  ListItemText,
  Checkbox,
  Button,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  dateFromDateToInfo,
  nftSponsorshipFiltersState,
} from 'store/nftSponsorshipStore';

const useStyles = makeStyles((theme) => ({
  selectBlock: {
    maxWidth: '160px',
    marginRight: '15px',
    marginBottom: '15px',
    [theme.breakpoints.down('tablet')]: {
      marginBottom: '15px',
    },
  },
  inputBlock: {
    minWidth: '180px',
    marginRight: '15px',
    [theme.breakpoints.down('tablet')]: {
      marginBottom: '15px',
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7.3 + ITEM_PADDING_TOP,
    },
  },
};

export const NftFilter = ({
  filters,
  handleChange,
  statusOptions,
  acquisitionModelOptions,
  statusData,
  acquisitionModelData,
  referralOptions,
  collectionsData,
  collectionOptions,
}) => {
  const classes = useStyles();

  const statusAndCollectionsReset = useResetRecoilState(
    nftSponsorshipFiltersState
  );
  const filterDateReset = useResetRecoilState(dateFromDateToInfo);

  const allFilterReset = () => {
    statusAndCollectionsReset();
    filterDateReset();
  };
  return (
    <Box>
      <FormControl className={classes.selectBlock} size='small'>
        <InputLabel id='demo-multiple-checkbox-label'>Status</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={statusData}
          name='statuses'
          onChange={handleChange}
          input={<OutlinedInput label='Status' />}
          renderValue={() => 'Status'}
          MenuProps={MenuProps}
        >
          {Object.keys(statusOptions).map((key) => {
            return (
              <MenuItem
                sx={{ height: '40px' }}
                key={key}
                value={statusOptions[key]}
              >
                <Checkbox
                  checked={statusData.indexOf(statusOptions[key]) > -1}
                />
                <ListItemText primary={statusOptions[key]} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: '130px', marginRight: 2 }} size='small'>
        <InputLabel id='demo-multiple-checkbox-label'>Collections</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={collectionsData || []}
          name='collectionIds'
          onChange={handleChange}
          input={<OutlinedInput label='Collections' />}
          renderValue={() => 'Collections'}
          MenuProps={MenuProps}
        >
          {collectionOptions.data.map(({ id, name }) => (
            <MenuItem sx={{ height: '40px' }} key={id} value={id}>
              <Checkbox checked={collectionsData.indexOf(id) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.inputBlock} size='small'>
        <InputLabel id='demo-multiple-checkbox-label'>
          Acquisition model
        </InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={acquisitionModelData}
          name='acquisitionModels'
          onChange={handleChange}
          input={<OutlinedInput label='Acquisition model' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {Object.keys(acquisitionModelOptions).map((key) => (
            <MenuItem
              sx={{ height: '40px' }}
              key={key}
              value={acquisitionModelOptions[key]}
            >
              <Checkbox
                checked={
                  acquisitionModelData.indexOf(acquisitionModelOptions[key]) >
                  -1
                }
              />
              <ListItemText primary={acquisitionModelOptions[key]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: '145px', marginRight: 2 }} size='small'>
        <InputLabel
          sx={{ backgroundColor: '#ffff' }}
          id='demo-simple-select-label'
        >
          Refferal code
        </InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={filters.referralCode || ''}
          name='referralCode'
          label='referralCode'
          onChange={handleChange}
        >
          {Object.keys(referralOptions).map((key) => (
            <MenuItem key={key} value={referralOptions[key]}>
              {key === 'None' ? <em>{key}</em> : key}
            </MenuItem>
          ))}
          key
        </Select>
      </FormControl>
      <Button
        sx={{height: '40px', textTransform: 'none', fontSize: '15px'}}
        variant='outlined'
        onClick={allFilterReset}
      >
        Reset All
      </Button>
    </Box>
  );
};

NftFilter.propTypes = {
  filters: PropTypes.any.isRequired,
  handleChange: PropTypes.func,
  statusOptions: PropTypes.object,
  statusData: PropTypes.array,
  acquisitionModelData: PropTypes.array,
  acquisitionModelOptions: PropTypes.object,
  referralOptions: PropTypes.object,
  collectionsData: PropTypes.array,
  collectionOptions: PropTypes.object,
};
