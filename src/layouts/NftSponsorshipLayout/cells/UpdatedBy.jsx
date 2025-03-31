import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Typography } from '@mui/material';
import styled from '@emotion/styled';

const StyledSpan = styled(Typography)(() => ({
  fontWeight: '400',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  display: 'inline-block',
}));

const styleHover = {
  overflow: 'visible',
  textOverflow: 'clip',
  whiteSpace: 'normal',
  maxWidth: '250px',
  wordBreak: 'break-all',
  marginBottom: '5px',
};

const styleWithoutHover = {
  whiteSpace: 'nowrap',
  width: '140px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '5px',
};

export const UpdatedByTableCell = ({ updated, updatedBy, updatedByEmail }) => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnterHandler = () => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  };

  return (
    <Box>
      {updatedBy && <StyledSpan>{updatedBy}</StyledSpan>}
      {updatedByEmail && (
        <Box
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          style={isHover ? styleHover : styleWithoutHover}
        >
          {updatedByEmail}
        </Box>
      )}
      {updated && <Box>{new Date(updated).toLocaleString()}</Box>}
    </Box>
  );
};

UpdatedByTableCell.propTypes = {
  updated: PropTypes.number,
  updatedBy: PropTypes.string,
  updatedByEmail: PropTypes.string,
};
