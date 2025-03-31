import * as React from 'react';
import { Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const CustomSnackbar = ({ message, status, from }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    status === 200 && setOpen(true);
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        sx={{ height: from === 'deployment' ? '100%' : '5%' }}
        anchorOrigin={{
          vertical: from === 'deployment' ? 'top' : 'bottom',
          horizontal: from === 'deployment' ? 'center' : 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='success'
          sx={{
            width: '280px',
            fontSize: '16px',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

CustomSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  from: PropTypes.string,
};
