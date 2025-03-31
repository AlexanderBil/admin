import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { invitationFiltersState } from 'store/invitationStore';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { makeStyles } from '@mui/styles';
import { accessRequestFiltersState } from 'store/accessRequestStore';

const useStyles = makeStyles((theme) => ({
  filterBox: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexWrap: 'wrap',
    },
  },
  roleSelect: {
    minWidth: '130px',
    marginRight: '15px',
    [theme.breakpoints.down('mobileL')]: {
      marginBottom: '15px',
    },
  }, 
  resetButton: {
    width: '130px',
    textTransform: 'none',
    fontSize: '15px',
    [theme.breakpoints.down('mobileL')]: {
  
    },
  },
}));

export const Filter = ({
  filters,
  roleOptions,
  SubRoleOptions,
  statusOptions,
  productOptions,
  handleChange,
  isNeadSelectProduct,
  isNeadCheckbox,
}) => {
  const classes = useStyles();
  const setFilters = useSetRecoilState(invitationFiltersState);
  const setChange = () => {
    setFilters((prev) => ({ ...prev, createdByMe: !prev.createdByMe }));
  };

  const allaccessRequestFilterReset = useResetRecoilState(accessRequestFiltersState);
  const allInvitationFilterReset = useResetRecoilState(invitationFiltersState);
  const allFilterReset = () => {
    allaccessRequestFilterReset();
    allInvitationFilterReset();
  }

  return (
    <Box>
      <Box className={classes.filterBox}>
        <FormControl className={classes.roleSelect} size='small'>
          <InputLabel id='demo-simple-select-label'>Role</InputLabel>
          <Select
            labelId='simple-select-label'
            id='simple-select'
            value={filters.roleId || 'all'}
            name='roleId'
            label='roleId'
            onChange={handleChange}
          >
            {Object.keys(roleOptions).map((key) => (
              <MenuItem key={key} value={roleOptions[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {filters.roleId === 'mp_creator' && (
          <FormControl sx={{ minWidth: 130, marginRight: 2 }} size='small'>
            <InputLabel id='demo-simple-select-label'>Sub-Role</InputLabel>
            <Select
              labelId='simple-select-label'
              id='simple-select'
              value={filters.subRoleId || ''}
              name='subRoleId'
              label='subRoleId'
              onChange={handleChange}
            >
              {Object.keys(SubRoleOptions).map((key) => (
                <MenuItem key={key} value={SubRoleOptions[key]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl sx={{ minWidth: 130, marginRight: 2 }} size='small'>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='simple-select-label'
            id='simple-select'
            value={filters.statuses || 'all'}
            name='statuses'
            label='statuses'
            onChange={handleChange}
          >
            {Object.keys(statusOptions).map((item) => (
              <MenuItem key={item} value={statusOptions[item]}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isNeadSelectProduct && (
          <FormControl sx={{ minWidth: 130, marginRight: 2 }} size='small'>
            <InputLabel id='simple-select-label'>Product</InputLabel>
            <Select
              labelId='simple-select-label'
              id='simple-select'
              value={filters.products || 'all'}
              name='products'
              label='products'
              onChange={handleChange}
            >
              {Object.keys(productOptions).map((item) => (
                <MenuItem key={item} value={productOptions[item]}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button
          className={classes.resetButton}
          variant='outlined'
          onClick={allFilterReset}
        >
          Reset All
        </Button>
      </Box>

      <Box>
        {isNeadCheckbox && (
          <FormControlLabel
            label='Only mine invitations'
            control={
              <Checkbox
                name='createdByMe'
                value={filters.createdByMe}
                checked={filters.createdByMe}
                onChange={setChange}
              />
            }
          />
        )}
      </Box>
    </Box>
  );
};

Filter.propTypes = {
  filters: PropTypes.any.isRequired,
  roleOptions: PropTypes.object.isRequired,
  SubRoleOptions: PropTypes.object.isRequired,
  statusOptions: PropTypes.object.isRequired,
  productOptions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  isNeadSelectProduct: PropTypes.bool.isRequired,
  isNeadCheckbox: PropTypes.bool.isRequired,
};
