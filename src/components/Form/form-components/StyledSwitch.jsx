import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { usersSubmitionFiltersState } from 'store/usersSubmitionStore';
import { contentFiltersState } from 'store/contentStore';
import { makeStyles } from '@mui/styles';
import { fiatPaymentsFiltersState } from 'store/fiatPaymentsStore';

const useStyles = makeStyles((theme) => ({
  switcherBlock: {
    marginRight: '0',
    [theme.breakpoints.down('tablet')]: {
      marginLeft: '-5px',
    },
    [theme.breakpoints.down('mobileL')]: {
      marginTop: '10px',
    },
  },
}));

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#65C466' : '#1976d2',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#bdbdbd' : '#65C466',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const CustomizedSwitches = ({ from, isCheked }) => {
  const classes = useStyles();
  const [userSubmissionFilter, setUserSubmissionFilter] = useRecoilState(
    usersSubmitionFiltersState
  );
  const [fiatPaymentsFilter, setFiatPaymentFilter] = useRecoilState(
    fiatPaymentsFiltersState
  );
  const [contentFilter, setContentFilter] = useRecoilState(contentFiltersState);
  const [checked, setChecked] = React.useState(isCheked);

  React.useEffect(() => {
    if (!fiatPaymentsFilter.ordersBy && from === 'paymentFilter') {
      setChecked(true);
    }
  }, [fiatPaymentsFilter]);

  React.useEffect(() => {
    if (userSubmissionFilter.sortOrder === 'desc' && from === 'userFilter') {
      setChecked(true);
    }
  }, [userSubmissionFilter]);

  const handleChange = (e) => {
    if (from === 'userFilter') {
      setChecked(e.target.checked);
      setUserSubmissionFilter((prev) => ({
        ...prev,
        sortOrder: checked ? 'asc' : 'desc',
      }));
    }
    if (from === 'paymentFilter') {
      setChecked(e.target.checked);
      setFiatPaymentFilter((prev) => ({
        ...prev,
        ordersBy: [
          {
            fieldName: 'created',
            sortOrder: checked ? 'ASC' : 'DESC',
          },
        ],
      }));
    }
    if (from === 'contentFilterNft') {
      setChecked(e.target.checked);
      setContentFilter((prev) => ({
        ...prev,
        withNft: checked ? false : true,
      }));
    }
    if (from === 'contentFilterMp') {
      setChecked(e.target.checked);
      setContentFilter((prev) => ({
        ...prev,
        withPassport: checked ? false : true,
      }));
    }
    if (from === 'contentFilterDraft') {
      setChecked(e.target.checked);
      let contentFilterState = contentFilter;
      const { statuses, ...newObj } = contentFilterState;
      if (checked) {
        setContentFilter(newObj);
      }
      if (!checked) {
        setContentFilter((prev) => ({
          ...prev,
          statuses: ['Draft'],
        }));
      }
    }
  };

  return (
    <FormControlLabel
      sx={{ marginBottom: from === 'paymentFilter' && '15px' }}
      className={classes.switcherBlock}
      control={
        <IOSSwitch onChange={handleChange} sx={{ m: 1 }} checked={checked} />
      }
      label={
        from === 'userFilter'
          ? 'Sorted by descending'
          : from === 'paymentFilter'
          ? 'Sorted by the most recent '
          : ''
      }
    />
  );
};

CustomizedSwitches.propTypes = {
  from: PropTypes.string,
  isCheked: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};
