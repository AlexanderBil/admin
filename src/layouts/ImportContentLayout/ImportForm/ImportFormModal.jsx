import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {

  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ImportFormModal = ({ open, handleCloseModal }) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleCloseModal}
        ></BootstrapDialogTitle>
        <DialogContent
          style={{
            padding: '0 25px 25px 25px',
            minWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant='h6'>Import has been started</Typography>
          <Button
            sx={{ minWidth: '100px', marginTop: '15px' }}
            onClick={handleCloseModal}
            variant='contained'
          >
            OK
          </Button>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

ImportFormModal.propTypes = {
  open: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
};

export default ImportFormModal;
