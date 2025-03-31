import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import { Button, Box, Avatar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ROLE_LABELS, SUB_ROLE_LABELS } from 'constants/';
import ModalWindow from '../../components/Modal';
import { Form } from 'components/Form/Form';
import { CancelResumeForm } from './CancelResumeForm';
import {
  cancelInvitation,
  resumeInvitation,
  resendNotification,
} from 'services/invitationService';
import {
  codeInfo,
  filteredInvitationState,
  invitationFiltersState,
  invitationState,
  isOpenModalState,
  isOpenModalCanselOrResume,
  globalDetails,
} from 'store/invitationStore';

import { CustomSnackbar } from 'components/CustomSnackbar/CustomSnackbar';
import {
  getDefaultData,
  invitationResponseData,
} from 'store/accessRequestStore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  thumbnailBox: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      maxWidth: '200px'
    },
  },
}));

const CancelButton = styled(Button)(() => ({
  color: '#fff',
  minWidth: '160px',
  fontSize: '12px',
  padding: '6px 0px',
  marginBottom: '10px',
  backgroundColor: '#d9534f',
  '&:hover': {
    backgroundColor: '#d02d2d',
  },
}));

const InvitationTableContainer = () => {
  const classes = useStyles();
  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';

  const [{ open }, setOpen] = useRecoilState(isOpenModalState);
  const [{ openModal }, setOpenModal] = useRecoilState(
    isOpenModalCanselOrResume
  );
  const { pagination } = useRecoilValue(invitationState);
  const setFilters = useSetRecoilState(invitationFiltersState);
  const setFilterCode = useSetRecoilState(codeInfo);
  const filteredInvitationData = useRecoilValue(filteredInvitationState);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [invitationData, setInvitationData] = useRecoilState(
    invitationResponseData
  );
  const defaultData = useRecoilValue(getDefaultData);

  const handleCloseModal = () => {
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const handleCloseModalCanselResume = () => {
    setOpenModal((prev) => ({ ...prev, openModal: false }));
  };

  const [codeValue, setCodeValue] = useState('');
  const [idValue, setIdValue] = useState('');
  const [cancelOrResume, setCancelOrResume] = useState(false);

  useEffect(() => {
    if (invitationData.response?.status === 200) {
      setOpen((prev) => ({ ...prev, open: false }));
      setStatus(200);
      setMessage('Success invitation!');
      setFilters((prev) => ({ ...prev, page: 0 }));
      setInvitationData({});
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
  }, [invitationData]);

  const openCancelModal = (code) => {
    setOpenModal((prev) => ({ ...prev, openModal: true }));
    setCodeValue(code);
    setCancelOrResume(true);
  };

  const openResumeModal = (code, id) => {
    setOpenModal((prev) => ({ ...prev, openModal: true }));
    setCodeValue(code);
    setIdValue(id);
    setCancelOrResume(false);
  };

  const cancelHandler = () => {
    setFilterCode((prev) => ({ ...prev, cancelCodeNumber: codeValue }));
    cancelInvitation(codeValue, { codeValue }).then((data) =>
      setStatus(data.status)
    );
    setMessage('Invitation canceled!');
    setTimeout(() => {
      setStatus(0);
    }, 1000);
  };

  const resumeHandler = () => {
    setFilterCode((prev) => ({ ...prev, cancelCodeNumber: '' }));
    setFilterCode((prev) => ({ ...prev, resumeId: idValue }));
    resumeInvitation(codeValue, { codeValue }).then((data) =>
      setStatus(data.status)
    );
    setMessage('Invitation restored!');
    setTimeout(() => {
      setStatus(0);
    }, 1000);
  };

  const resendHandler = (code) => {
    resendNotification(code, { code }).then((data) => setStatus(data.status));
    setMessage('Success resend notification!');
    setTimeout(() => {
      setStatus(0);
    }, 1000);
  };

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const columns = [
    {
      name: 'email',
      label: 'Email',
      renderCell: ({ email, silently }) => (
        <Box>
          <Box>{email}</Box>
          <Box>
            {silently && (
              <span style={{ fontStyle: 'italic' }}>(silently)</span>
            )}
          </Box>
        </Box>
      ),
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'role',
      label: 'Role',
      renderCell: ({ role, subRole }) => (
        <>
          <span>{ROLE_LABELS[role] || ''}</span>
          {subRole ? <span> - {SUB_ROLE_LABELS[subRole] || ''}</span> : null}
        </>
      ),
    },
    {
      name: 'created',
      label: 'Creation Date',
    },
    {
      name: 'consumed',
      label: 'Consumption Date',
      renderCell: ({ consumed }) => (
        <Box>{consumed && new Date(consumed).toLocaleString()}</Box>
      ),
    },
    {
      name: 'algoAmount',
      label: 'Incentives (Algo)',
      renderCell: ({ algoAmount }) => (
        <>
          <span>{algoAmount ? `${algoAmount} (ALGO)` : ''}</span>
        </>
      ),
    },
    {
      name: 'assetAmount',
      label: `Incentives ${tokenName}`,
      renderCell: ({ assetAmount }) => (
        <>
          <span>{assetAmount ? `${assetAmount} ${tokenName}` : ''}</span>
        </>
      ),
    },
    {
      name: 'comment',
      label: 'Comment',
    },
  
    {
      name: 'thumbnailUrl',
      label: 'Created By',
      renderCell: ({
        thumbnailUrl,
        firstName,
        lastName,
        createdByEmail,
        fullName,
      }) => (
        <Box className={classes.thumbnailBox}>
          <Avatar
            sx={{ marginRight: { mobileS: '0px', tablet: '15px' } }}
            src={thumbnailUrl}
            alt={`${firstName} ${lastName} avatar`}
          >{`${firstName[0] || ''}${lastName[0] || ''}`}</Avatar>
          <Box>
            <Box>{createdByEmail}</Box>
            <Box>{fullName}</Box>
          </Box>
        </Box>
      ),
    },
    {
      name: '',
      label: 'Notification',
      renderCell: ({ status, code, id }) => {
        if (status === 'Active') {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CancelButton onClick={() => openCancelModal(code)}>
                Cancel
              </CancelButton>
              <Button
                style={{
                  padding: '6px 6px',
                  fontSize: '12px',
                  minWidth: '160px',
                  width: '100%'
                }}
                variant='contained'
                onClick={() => resendHandler(code)}
              >
                Resend notification
              </Button>
            </div>
          );
        }
        if (status === 'Canceled') {
          return (
            <Button
              style={{
                padding: '6px 6px',
                fontSize: '12px',
                minWidth: '160px',
                width: '100%'
              }}
              variant='contained'
              onClick={() => openResumeModal(code, id)}
            >
              Resume
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
        cancelOrResume={cancelOrResume}
        cancelHandler={cancelHandler}
        resumeHandler={resumeHandler}
        open={openModal}
        handleCloseModal={handleCloseModalCanselResume}
        form={CancelResumeForm}
      />
      <ModalWindow
        open={open}
        handleCloseModal={handleCloseModal}
        isInvitationModal={true}
        form={Form}
        defaultData={defaultData}
      />
      <Table
        columns={columns}
        data={filteredInvitationData}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
      />
      <CustomSnackbar message={message} status={status} />
    </>
  );
};

export default InvitationTableContainer;
