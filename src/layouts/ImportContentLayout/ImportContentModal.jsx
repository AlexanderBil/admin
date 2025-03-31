import React, { Suspense } from 'react';
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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  detailsCode,
  filterImportContentDetailsState,
  sourceListState,
} from 'store/importContentStore';
import ImportContentModalTable from './ImportContentModalTable';
import { Loader } from 'components/Loader/Loader';
import { modeList } from './ImportForm/ImportForm';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    paddingBottom: '20px',
    width: '100%',
    maxWidth: '1200px',
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
    },
  },
  contentBoxLeft: {
    border: '1px solid grey',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '8px',
    padding: '15px',
    maxWidth: '380px',
    width: '100%',
    marginRight: '30px',

    [theme.breakpoints.down('laptop')]: {
      marginBottom: '15px',
    },
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
    },
  },
  contentBoxRight: {
    border: '1px solid grey',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '8px',
    padding: '15px',

    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
    },
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5),
  },
  '& .MuiDialog-paper': {
    maxWidth: '1200px',
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

const ImportContentModal = ({
  open,
  handleCloseModal,
  data,
  showDetails,
  setShowDetails,
}) => {
  const classes = useStyles();
  const setFilterData = useSetRecoilState(filterImportContentDetailsState);
  const { code } = useRecoilValue(detailsCode);
  const { optionsData } = useRecoilValue(detailsCode);
  const { sourceList } = useRecoilValue(sourceListState);

  const getDetailsDataHandler = (detailsCode) => {
    setFilterData((prev) => ({
      ...prev,
      requestCodes: [detailsCode],
    }));
  };

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
        >
          Import details <hr />
        </BootstrapDialogTitle>

        <DialogContent style={{ padding: '0 25px 25px 25px' }}>
          <Box>
            <Box className={classes.contentBox}>
              <Box className={classes.contentBoxLeft}>
                <Box>
                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>Status:</span>{' '}
                    {data.requestStatus}
                  </Typography>
                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>Total records:</span>{' '}
                    {data.totalItems}
                  </Typography>
                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>
                      Supported records:
                    </span>{' '}
                    {data.supportedItems}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>
                      Processed records:
                    </span>{' '}
                    {data.processedItems}
                  </Typography>
                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>Ignored records:</span>{' '}
                    {data.ignoredItems}
                  </Typography>
                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>Errors:</span>{' '}
                    {data.errorItems}
                  </Typography>
                </Box>
              </Box>

              <Box className={classes.contentBoxRight}>
                <Box sx={{ marginRight: { mobileS: '0px', tablet: '30px' } }}>
                  {sourceList.map((item) => {
                    if (item.id === Number(optionsData?.source)) {
                      return (
                        <Typography sx={{ fontSize: '16px' }} key={item.id}>
                          <span style={{ fontWeight: '500' }}>Source:</span>{' '}
                          {item.name}
                        </Typography>
                      );
                    }
                  })}

                  {optionsData?.options?.importOptions?.subSource && (
                    <Typography sx={{ wordBreak: 'break-all' }}>
                      <span style={{ fontWeight: '500' }}>Subsourse:</span>{' '}
                      {optionsData?.options?.importOptions?.subSource}
                    </Typography>
                  )}

                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>Locale:</span>{' '}
                    {optionsData?.locale}
                  </Typography>
                  <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                    <span style={{ fontWeight: '500' }}>Created:</span>{' '}
                    {new Date(optionsData?.created).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ width: '230px' }}>
                  {optionsData.options?.importOptions?.page && (
                    <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                      <span style={{ fontWeight: '500' }}>Page:</span>{' '}
                      {optionsData.options?.importOptions?.page}
                    </Typography>
                  )}
                  {optionsData.options?.importOptions?.pageSize && (
                    <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                      <span style={{ fontWeight: '500' }}>Page Size:</span>{' '}
                      {optionsData.options?.importOptions?.pageSize}
                    </Typography>
                  )}
                  {optionsData.options?.importOptions?.importMode && (
                    <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                      <span style={{ fontWeight: '500' }}>Import Mode:</span>{' '}
                      {modeList.map((item) => {
                        if (
                          item.value.toLowerCase() ===
                          optionsData.options?.importOptions?.importMode
                        ) {
                          return item.label;
                        }
                      })}
                    </Typography>
                  )}
                  {optionsData.options?.aiRequest && (
                    <Typography sx={{ marginBottom: '3px' }} variant='body1'>
                      <span style={{ fontWeight: '500' }}>AI Categories:</span>{' '}
                      {optionsData.options?.aiRequest?.aiCategories[0]}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            {data.details && (
              <Typography sx={{ marginTop: '10px' }}>
                <span style={{ fontWeight: '500' }}>Details:</span>{' '}
                <span>{data.details}</span>
              </Typography>
            )}
            <Typography></Typography>
            <hr />
            <Button
              disabled={showDetails}
              onClick={() => {
                getDetailsDataHandler(code);
                setShowDetails(true);
              }}
            >
              more details...
            </Button>
            {showDetails && (
              <Suspense fallback={<Loader />}>
                <Box>
                  <ImportContentModalTable />
                </Box>
              </Suspense>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

ImportContentModal.propTypes = {
  open: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
  data: PropTypes.object,
  showDetails: PropTypes.bool,
  setShowDetails: PropTypes.func,
};

export default ImportContentModal;
