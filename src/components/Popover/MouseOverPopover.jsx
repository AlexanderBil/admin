import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function MouseOverPopover({
  anchorEl,
  handlePopoverClose,
  open,
  copyText
}) {
  return (
    <div>
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
          marginLeft: '5px'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{copyText}</Typography>
      </Popover>
    </div>
  );
}

MouseOverPopover.propTypes = {
  anchorEl: PropTypes.object,
  handlePopoverClose: PropTypes.func,
  open: PropTypes.bool,
  copyText: PropTypes.string,
};
