import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    margin: '0px 20px 20px 20px',
    [theme.breakpoints.down('tablet')]: {
      minWidth: '260px',
      margin: '0px 10px 10px 10px',
    },
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '0px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0),
  },

  '& .MuiDialog-paper': {
    margin: '15px',
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

const ModalWindow = ({
  open,
  handleCloseModal,
  form,
  defaultData,
  cancelHandler,
  resumeHandler,
  cancelOrResume,
}) => {
  const Form = form;
  const classes = useStyles();
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
        <DialogContent className={classes.contentBox}>
          <Form
            defaultData={defaultData}
            cancelHandler={cancelHandler}
            resumeHandler={resumeHandler}
            cancelOrResume={cancelOrResume}
            handleCloseModal={handleCloseModal}
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

ModalWindow.propTypes = {
  open: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  form: PropTypes.func,
  defaultData: PropTypes.object,
  cancelHandler: PropTypes.func,
  resumeHandler: PropTypes.func,
  cancelOrResume: PropTypes.bool,
};

export default ModalWindow;
