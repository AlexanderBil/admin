import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import { Box, Button, Avatar, Link, Typography } from '@mui/material';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilRefresher_UNSTABLE,
} from 'recoil';
import ModalWindow from '../../components/Modal';
import { DeploymentRequestForm } from './DeploymentRequestForm/DeploymentRequestForm';
import { styled } from '@mui/material/styles';

import { CustomSnackbar } from '../../components/CustomSnackbar/CustomSnackbar';
import {
  deploymentRequestState,
  openModal,
  deploymentResponseData,
  deploymentRequestFiltersState,
  idInfo,
} from 'store/deploymentRequestStore';
import { DeploymentTableCell } from './DeploymentTableCell';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  submiterBlock: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  reviewerBlock: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
}));

const CancelButton = styled(Button)(() => ({
  color: '#fff',
  maxWidth: '145px',
  fontSize: '12px',
  padding: '6px 0px',

  backgroundColor: '#d9534f',
  '&:hover': {
    backgroundColor: '#d02d2d',
  },
}));

const DeploymentRequestTableContainer = () => {
  const classes = useStyles();
  const { deploymentRequestData } = useRecoilValue(deploymentRequestState);
  const refreshContent = useRecoilRefresher_UNSTABLE(deploymentRequestState);
  const [{ open }, setOpen] = useRecoilState(openModal);
  const { pagination } = useRecoilValue(deploymentRequestState);
  const setFilters = useSetRecoilState(deploymentRequestFiltersState);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useRecoilState(
    deploymentResponseData
  );

  const [contentFilter, setContentFilter] = useRecoilState(idInfo);

  const handleCloseModal = () => {
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const declinedHandler = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setContentFilter((prev) => ({
      ...prev,
      id: id,
      action: 'decline',
    }));
  };

  const approveHandler = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setContentFilter((prev) => ({
      ...prev,
      id: id,
      action: 'approve',
    }));
  };

  const deployHandler = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setContentFilter((prev) => ({
      ...prev,
      id: id,
      action: 'deploy',
    }));
  };

  useEffect(() => {
    if (
      responseData.response?.status === 204 ||
      responseData.response?.status === 201
    ) {
      setFilters((prevState) => ({ ...prevState }));
      setStatus(200);
      setMessage(
        contentFilter.action === 'approve'
          ? 'Successfully approved!'
          : contentFilter.action === 'deploy'
          ? 'Successfully deployed!'
          : 'Successfully declined!'
      );
      setOpen((prev) => ({ ...prev, open: false }));
      setResponseData({});
      refreshContent();
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
  }, [responseData]);

  const columns = [
    {
      name: 'id',
      label: 'Content ID',
      renderCell: ({ contentId }) => (
        <Link
          target='_blank'
          style={{
            color: '#1976d2',
            textDecorationColor: '#000',
            fontSize: '16px',
          }}
          href={`/admin/content/${contentId}`}
        >
          {contentId}
        </Link>
      ),
    },
    {
      name: 'status',
      label: 'Status',
      renderCell: ({ status }) => {
        let str = status.toLowerCase();
        const capitalize = (str) => str[0].toUpperCase() + str.substring(1);

        return (
          <Box
            style={{
              color:
                status === 'DECLINED'
                  ? 'red'
                  : status === 'APPROVED'
                  ? 'green'
                  : status === 'DONE'
                  ? 'blue'
                  : status === 'ACTIVE'
                  ? '#fbb70c'
                  : status === 'ERROR'
                  ? '#12dcdd'
                  : 'black',
            }}
          >
            {capitalize(str)}
          </Box>
        );
      },
    },
    {
      name: 'submitterAccount',
      label: 'Submitter',
      renderCell: ({ submitterAccount }) => (
        <Box className={classes.submiterBlock}>
          <Avatar
            sx={{ marginRight: { mobileS: '0px', tablet: '15px' } }}
            src={submitterAccount.thumbnailUrl}
            alt={`${submitterAccount.first} ${submitterAccount.last} avatar`}
          >{`${submitterAccount.first[0] || ''}${
            submitterAccount.first[0] || ''
          }`}</Avatar>
          <Box>
            <Box>{submitterAccount.email}</Box>
            <Box>{`${submitterAccount.first} ${submitterAccount.last}`}</Box>
          </Box>
        </Box>
      ),
    },
    {
      name: 'reviewerAccount',
      label: 'Reviewer',
      renderCell: ({ reviewerAccount }) =>
        reviewerAccount && (
          <Box className={classes.reviewerBlock}>
            <Avatar
              sx={{ marginRight: { mobileS: '0px', tablet: '15px' } }}
              src={reviewerAccount.thumbnailUrl}
              alt={`${reviewerAccount.first} ${reviewerAccount.last} avatar`}
            >{`${reviewerAccount.first[0] || ''}${
              reviewerAccount.first[0] || ''
            }`}</Avatar>
            <Box>
              <Box>{reviewerAccount.email}</Box>
              <Box>{`${reviewerAccount.first} ${reviewerAccount.last}`}</Box>
            </Box>
          </Box>
        ),
    },
    {
      name: 'destination',
      label: 'Destination',
      renderCell: ({ destination }) => (
        <DeploymentTableCell destination={destination} />
      ),
    },
    {
      name: 'created',
      label: 'Created',
      renderCell: ({ created }) => (
        <Box style={{ width: '100px' }}>
          {new Date(created).toLocaleString()}
        </Box>
      ),
    },
    {
      name: 'updated',
      label: 'Updated',
      renderCell: ({ updated }) =>
        updated && (
          <Box style={{ width: '100px' }}>
            <Box>{new Date(updated).toLocaleString()}</Box>
          </Box>
        ),
    },
    {
      name: 'details',
      label: 'Details',
      renderCell: ({ details }) =>
        details && (
          <Box>
            <Typography style={{ fontSize: '15px' }}>{details}</Typography>
          </Box>
        ),
    },
    {
      name: '',
      label: '',
      renderCell: ({ id, status, deploymentAllowed }) => {
        if (status === 'PENDING') {
          return (
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                sx={{
                  marginBottom: '10px',
                  fontSize: '12px',
                  maxWidth: '145px',
                  padding: '6px 25px',
                  backgroundColor: 'green',
                  '&:hover': {
                    backgroundColor: '#0b6e0b',
                  },
                }}
                variant='contained'
                onClick={() => approveHandler(id)}
              >
                Approve
              </Button>
              <CancelButton onClick={() => declinedHandler(id)}>
                Decline
              </CancelButton>
            </Box>
          );
        }
        if (deploymentAllowed) {
          return (
            <Button
              sx={{
                marginBottom: '10px',
                fontSize: '12px',
                maxWidth: '145px',
                padding: '6px 25px',
                width: '100px',
              }}
              variant='contained'
              onClick={() => deployHandler(id)}
            >
              Deploy
            </Button>
          );
        }
      },
    },
  ];

  return (
    <>
      <hr style={{ borderColor: '#f7fafc5c' }} />
      <ModalWindow
        open={open}
        handleCloseModal={handleCloseModal}
        form={DeploymentRequestForm}
      />
      <Table
        columns={columns}
        data={deploymentRequestData}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
      />
      <CustomSnackbar message={message} status={status} from='deployment' />
    </>
  );
};

export default DeploymentRequestTableContainer;
