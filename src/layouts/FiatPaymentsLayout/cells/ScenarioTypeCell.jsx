import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SCENARIO_TYPE_LABELS } from 'constants/';

const useStyles = makeStyles((theme) => ({
  styleWithoutHover: {
    whiteSpace: 'nowrap',
    maxWidth: '200px',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('tablet')]: {
      maxWidth: '200px',
      wordBreak: 'break-all',
      whiteSpace: 'normal',
    },
  },
  styleHover: {
    overflow: 'visible',
    textOverflow: 'clip',
    whiteSpace: 'normal',
    maxWidth: '200px',
    width: '100%',
    wordBreak: 'break-all',
    [theme.breakpoints.down('tablet')]: {},
  },
}));

export const ScenarioTypeCell = ({ scenarioType }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);

  const onMouseEnterHandler = () => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  };

  return (
    <Box onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <Box className={isHover ? classes.styleHover : classes.styleWithoutHover}>
        {SCENARIO_TYPE_LABELS[scenarioType]}
      </Box>
    </Box>
  );
};

ScenarioTypeCell.propTypes = {
  scenarioType: PropTypes.string,
};
