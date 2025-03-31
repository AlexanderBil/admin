import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import warning from '../../images/warning.svg';
import ok from '../../images/ok.svg';
import { Loader } from 'components/Loader/Loader';
import {
  singleBulkActivation,
  groupBulkActivation,
} from 'services/contentService';
import ContentPublishModalTable from './cells/ContentPublishModalTable';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { contentState } from 'store/contentStore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5),
  },
  '& .MuiDialog-paper': {
    maxWidth: '550px',
    padding: '20px',
  },

  '& .MuiDialogActions-root': {},
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

const ContentPublishModal = ({
  open,
  handleCloseModal,
  checkboxBulkState,
  setSingleBulkData,
  setGroupeBulkData,
  setSingleBulkErrorData,
  setGroupeBulkErrorData,
  switchPopapContent,
  setSwitchPopapContent,
  singleBulkErrorData,
  singleBulkData,
  groupeBulkData,
  groupeBulkErrorData,
  showDetails,
  setShowDetails,
}) => {
  const [showLoader, setShowLoader] = React.useState(false);
  const refresh = useRecoilRefresher_UNSTABLE(contentState);

  const bulkActivationHandler = (idArr) => {
    setSwitchPopapContent(true);
    setShowLoader(true);
    if (idArr.length === 1) {
      singleBulkActivation(idArr[0])
        .then((data) => setSingleBulkData(data))
        .then(() => setShowLoader(false))
        .catch((error) => {
          setSingleBulkErrorData(error.response);
          setShowLoader(false);
        });
    }
    if (idArr.length > 1) {
      groupBulkActivation(idArr)
        .then((data) => setGroupeBulkData(data))
        .then(() => setShowLoader(false))
        .catch((error) => {
          setGroupeBulkErrorData(error.response);
          setShowLoader(false);
        });
    }
  };

  useEffect(() => {
    if (singleBulkData.status === 200) {
      refresh();
    }
    if (groupeBulkData.data) {
      if (
        groupeBulkData.data.status.filter((item) => item.published === true)
          .length > 0
      ) {
        refresh();
      }
    }
  }, [singleBulkData.status, groupeBulkData]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleCloseModal}
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
              <Loader from='content_publish' />
            </Box>
          )}
        </Box>

        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleCloseModal}
        ></BootstrapDialogTitle>

        <DialogContent
          style={{
            padding: '25px 0px 20px 0px',
              display: 'flex',
            flexDirection: 'column',
             textAlign: 'center',
          }}
        >
          {!switchPopapContent ? (
            <Box
              style={{
                display: 'grid',
                gridRowGap: '20px',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h6'>
                {' '}
                Are you sure want to publish the selected content?{' '}
              </Typography>
              <Typography sx={{ fontSize: '16px', margin: '0 auto' }}>
                Notice, AI scanning is not being executed here!
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '250px',
                  margin: '0 auto',
                }}
              >
                <Button
                  sx={{ marginTop: '10px', padding: '10px 40px 10px 40px' }}
                  onClick={() => bulkActivationHandler(checkboxBulkState)}
                  variant={'contained'}
                >
                  Yes
                </Button>

                <Button
                  sx={{ marginTop: '10px', padding: '10px 40px 10px 40px' }}
                  onClick={() => handleCloseModal()}
                  color='error'
                  variant={'contained'}
                >
                  No
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box>
                {singleBulkData.status === 200 ||
                groupeBulkData.status === 200 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Box sx={{ marginBottom: '20px' }} width={80} height={80}>
                      <img src={ok} alt={'logo'} />
                    </Box>
                    <Typography sx={{ marginBottom: '20px' }} variant='h6'>
                      Publication completed!
                    </Typography>
                  </Box>
                ) : null}
              </Box>

              {groupeBulkData.data && (
                <Box sx={{ padding: '0px 20px' }}>
                  <Typography sx={{ fontWeight: '500', marginLeft: '5px' }}>
                    Requested to publish: {groupeBulkData.data.total}
                  </Typography>
                  {
                    <Typography
                      sx={{
                        marginLeft: '5px',
                      }}
                    >
                      Published:{' '}
                      {
                        groupeBulkData.data.status.filter(
                          (item) => item.published === true
                        ).length
                      }
                    </Typography>
                  }
                                    {
                    <Typography
                      sx={{
                        marginBottom: '10px',
                        marginLeft: '5px',
                      }}
                    >
                      Not published:{' '}
                      {groupeBulkData.data.total -
                        groupeBulkData.data.status.filter(
                          (item) => item.published === true
                        ).length
                      }
                    </Typography>
                  }

                  <Button
                    disabled={showDetails}
                    onClick={() => {
                      setShowDetails(true);
                    }}
                  >
                    more details...
                  </Button>
                  {showDetails && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <ContentPublishModalTable
                        groupeBulkData={groupeBulkData}
                        from='contentPublish'
                      />
                      <Button
                        onClick={handleCloseModal}
                        sx={{ padding: '5px 50px', marginTop: '30px' }}
                        variant='contained'
                      >
                        OK
                      </Button>
                    </Box>
                  )}
                </Box>
              )}

              <Box>
                {singleBulkErrorData.status === 500 ||
                singleBulkErrorData.status === 404 ||
                groupeBulkData.status === 500 ||
                groupeBulkData.status === 404 ||
                groupeBulkErrorData.status === 500 ||
                groupeBulkErrorData.status === 400 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ marginBottom: '20px' }} width={80} height={80}>
                      <img src={warning} alt={'logo'} />
                    </Box>
                    <Typography variant='h6'>
                      Publication is not successful!
                    </Typography>
                    <Typography sx={{ color: 'red' }}>
                      {singleBulkErrorData.status &&
                        singleBulkErrorData.data.errorDetails[0]}
                    </Typography>
                    <Typography sx={{ color: 'red' }}>
                      {groupeBulkErrorData.status === 400
                        ? groupeBulkErrorData.data.message
                        : groupeBulkErrorData.data?.errorDetails[0]}
                    </Typography>
                    <Box>
                      <Button
                        onClick={handleCloseModal}
                        sx={{ padding: '5px 50px', marginTop: '30px' }}
                        variant='contained'
                      >
                        OK
                      </Button>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Box>
          )}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

ContentPublishModal.propTypes = {
  open: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
  singleBulkData: PropTypes.object,
  groupeBulkData: PropTypes.object,
  showLoader: PropTypes.bool,
  singleBulkErrorData: PropTypes.object,
  groupeBulkErrorData: PropTypes.object,
  checkboxBulkState: PropTypes.array,
  setSingleBulkData: PropTypes.func,
  setGroupeBulkData: PropTypes.func,
  setSingleBulkErrorData: PropTypes.func,
  setGroupeBulkErrorData: PropTypes.func,
  switchPopapContent: PropTypes.bool,
  setSwitchPopapContent: PropTypes.func,
  showDetails: PropTypes.bool,
  setShowDetails: PropTypes.func,
};

export default ContentPublishModal;
