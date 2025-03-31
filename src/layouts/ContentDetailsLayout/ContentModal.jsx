import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import warning from '../../images/warning.svg';
import ok from '../../images/ok.svg';
import { Loader } from 'components/Loader/Loader';
import { AI_CHECK_VERDICTS } from 'constants/';
import { useNavigate } from 'react-router-dom';

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

const ModalWindow = ({
  open,
  handleCloseModal,
  activateOrSubmitHandler,
  aiData,
  aiError,
  setAiData,
  setAiError,
  showLoader,
  activateContentStatus,
  deleteContentStatus,
  setActivateError,
  activateError,
  deleteError,
  removeModal,
  removeContentHandler,
}) => {

  const navigate = useNavigate();

  const closeModalHandler = () => {
    handleCloseModal();
    setAiError({});
    setAiData({});
    setActivateError({});
    deleteContentStatus === 204 && navigate('/admin/content');
  };


  return (
    <div>
      <BootstrapDialog
        onClose={closeModalHandler}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <Box>
          {showLoader && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                zIndex: '10',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.229)',
              }}
            >
              <Loader />
            </Box>
          )}
        </Box>

        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={closeModalHandler}
        ></BootstrapDialogTitle>
        <DialogContent
          sx={{
            padding: '25px 0px 40px 0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box width={80} height={80}>
            {activateContentStatus === 200 || deleteContentStatus === 204 ? (
              <img src={ok} alt={'logo'} />
            ) : (
              <img src={warning} alt={'logo'} />
            )}
          </Box>

          <Typography
            sx={{ marginTop: '20px', maxWidth: '240px', textAlign: 'center' }}
            variant='h6'
          >
            {aiData?.verdict === AI_CHECK_VERDICTS.notSafety ||
            aiData?.verdict === AI_CHECK_VERDICTS.warning
              ? 'AI Health Check critical warnings!'
              : activateContentStatus === 200
                ? 'Your content was successfully published'
                : deleteContentStatus === 204
                  ? 'Your content was deleted'
                  : removeModal
                    ? 'Remove Content'
                    : 'Publish Content?'}
          </Typography>

          {activateContentStatus !== 200 && deleteContentStatus === 0 ? (
            <Typography
              sx={{
                maxWidth: '275px',
                textAlign: 'center',
                marginTop: '20px',
                fontSize: '14px',
              }}
            >
              {aiData?.verdict === AI_CHECK_VERDICTS.notSafety ||
              aiData?.verdict === AI_CHECK_VERDICTS.warning
                ? `AI Health Check scan found critical warnings in the your content.
                   Would you like to publish content anyway?`
                : removeModal
                  ? 'Are you sure want to delete this content?'
                  : 'Are you sure want to publish this content?'}
            </Typography>
          ) : null}

          {activateContentStatus === 200 || deleteContentStatus === 204 ? (
            <Button
              onClick={closeModalHandler}
              sx={{
                minWidth: '150px',
                marginTop: '20px',
                textTransform: 'none',
              }}
              variant='contained'
            >
              Continue
            </Button>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                sx={{
                  minWidth: '150px',
                  marginTop: '20px',
                  textTransform: 'none',
                }}
                variant='contained'
                onClick={
                  removeModal ? removeContentHandler : activateOrSubmitHandler
                }
              >
                {aiData?.verdict === AI_CHECK_VERDICTS.notSafety ||
                aiData?.verdict === AI_CHECK_VERDICTS.warning
                  ? 'Activate'
                  : removeModal
                    ? 'Yes'
                    : 'Submit'}
              </Button>
              <Button
                onClick={closeModalHandler}
                sx={{
                  minWidth: '150px',
                  marginTop: '10px',
                  textTransform: 'none',
                }}
                variant='outlined'
              >
                {aiData?.verdict === AI_CHECK_VERDICTS.notSafety ||
                aiData?.verdict === AI_CHECK_VERDICTS.warning
                  ? 'Nothing'
                  : removeModal
                    ? 'No'
                    : 'Cancel'}
              </Button>
            </Box>
          )}
        </DialogContent>
        {aiError?.errorDetails ||
        activateError?.errorDetails ||
        deleteError?.message ? (
          <Typography
            sx={{
              color: 'red',
              fontSize: '16px',
              textAlign: 'center',
              maxWidth: '310px',
              margin: '0 auto',
              marginBottom: '20px',
            }}
          >
            {aiError?.errorDetails}
            {activateError?.errorDetails}
            {deleteError?.message}
          </Typography>
        ) : null}
      </BootstrapDialog>
    </div>
  );
};

ModalWindow.propTypes = {
  open: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  cancelHandler: PropTypes.func,
  activateOrSubmitHandler: PropTypes.func,
  aiData: PropTypes.object,
  aiError: PropTypes.object,
  setAiData: PropTypes.func,
  setAiError: PropTypes.func,
  showLoader: PropTypes.bool,
  activateContentStatus: PropTypes.number,
  deleteContentStatus: PropTypes.number,
  setActivateError: PropTypes.func,
  activateError: PropTypes.object,
  deleteError: PropTypes.object,
  removeModal: PropTypes.bool,
  removeContentHandler: PropTypes.func,
};

export default ModalWindow;
