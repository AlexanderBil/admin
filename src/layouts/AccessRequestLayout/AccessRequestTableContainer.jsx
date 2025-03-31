import React, { useState, useEffect } from 'react';
import Table from 'components/Table';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  accessRequestFiltersState,
  filteredAccessRequestState,
  invitationResponseData,
  accessRequestState,
  getDefaultData,
  isOpenModalCanselOrComplete,
} from 'store/accessRequestStore';
import { ROLE_LABELS, SUB_ROLE_LABELS } from 'constants/';
import ModalWindow from '../../components/Modal';

import { accessRequestComplete } from 'services/accessRequestService';
import { accessRequestCancel } from 'services/accessRequestService';
import { idState } from 'store/accessRequestStore';
import { isOpenModalState } from 'store/invitationStore';
import { Form } from 'components/Form/Form';
import { CustomSnackbar } from 'components/CustomSnackbar/CustomSnackbar';
import { CancelCompleteForm } from './CancelCompleteForm';

const AccessRequestTableContainer = () => {
  const CancelButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#d9534f',
    fontSize: '12px',
    maxWidth: '145px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#d02d2d',
    },
  }));

  const InvitationButton = styled(Button)(() => ({
    color: '#fff',
    padding: '6px 0px',
    backgroundColor: '#1d5f14',
    fontSize: '12px',
    width: '125px',
    '&:hover': {
      backgroundColor: '#193910',
    },
  }));

  const [{ open }, setOpen] = useRecoilState(isOpenModalState);
  const [filterId, setFilterId] = useRecoilState(idState);
  const filteredData = useRecoilValue(filteredAccessRequestState);
  const [invitationData, setInvitationData] = useRecoilState(
    invitationResponseData
  );
  const { pagination } = useRecoilValue(accessRequestState);
  const setFilters = useSetRecoilState(accessRequestFiltersState);
  const setIdDelete = useSetRecoilState(idState);
  const defaultData = useRecoilValue(getDefaultData);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');

  const [{ openModal }, setOpenModal] = useRecoilState(
    isOpenModalCanselOrComplete
  );

  const [idValue, setIdValue] = useState('');
  const [cancelOrResume, setCancelOrResume] = useState(false);

  useEffect(() => {
    if (invitationData.response?.status === 200) {
      setOpen((prev) => ({ ...prev, open: false }));
      resumeHandler(filterId.idInvitetion);
      setStatus(200);
      setMessage('Success invitation!');
      setInvitationData({});
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
  }, [invitationData]);

  const handleCloseModalCanselResume = () => {
    setOpenModal((prev) => ({ ...prev, openModal: false }));
  };

  const handleOpenModal = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setFilterId((prev) => ({ ...prev, idInvitetion: id }));
  };

  const handleCloseModal = () => {
    setOpen((prev) => ({ ...prev, open: false }));
    setIdDelete((prev) => ({ ...prev, idInvitetion: 0 }));
  };

  const openCancelModal = (id) => {
    setOpenModal((prev) => ({ ...prev, openModal: true }));
    setIdValue(id);
    setCancelOrResume(true);
  };

  const openCompleteModal = (id) => {
    setOpenModal((prev) => ({ ...prev, openModal: true }));
    setIdValue(id);
    setCancelOrResume(false);
  };

  const cancelHandler = () => {
    setFilterId((prev) => ({ ...prev, idCancel: idValue }));
    accessRequestCancel(idValue, { idValue });
    setFilters((prevState) => ({ ...prevState, page: 0 }));
  };

  const resumeHandler = () => {
    setFilterId((prev) => ({ ...prev, idComplete: idValue }));
    accessRequestComplete(idValue, { idValue });
    setFilters((prevState) => ({ ...prevState, page: 0 }));
  };

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const columns = [
    {
      name: 'id',
      label: 'ID',
    },
    {
      name: 'ip',
      label: 'IP',
    },
    {
      name: 'product',
      label: 'Product',
    },
    {
      name: 'email',
      label: 'Email',
      renderCell: ({ email }) => (
        <Box sx={{ maxWidth: '320px', wordBreak: 'break-all' }}>{email}</Box>
      ),
    },
    {
      name: 'role',
      label: 'Role',
      renderCell: ({ role, subRole }) => (
        <Box>
          <span>{ROLE_LABELS[role] || ''}</span>
          {subRole ? <span> - {SUB_ROLE_LABELS[subRole] || ''}</span> : null}
        </Box>
      ),
    },
    {
      name: 'comment',
      label: 'Comment',
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'created',
      label: 'Created',
    },
    {
      name: '',
      label: '',
      renderCell: ({ status, id }) =>
        status === 'Pending' && (
          <Box style={{ display: 'flex', flexDirection: 'column', width: '125px' }}>
            <CancelButton onClick={() => openCancelModal(id)}>
              Cancel
            </CancelButton>
            <Button
              sx={{ marginBottom: '10px', fontSize: '12px', width: '125px' }}
              variant='contained'
              onClick={() => openCompleteModal(id)}
            >
              Complete
            </Button>
            <InvitationButton onClick={() => handleOpenModal(id)}>
              New invitation
            </InvitationButton>
          </Box>
        ),
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
        form={CancelCompleteForm}
      />
      <ModalWindow
        open={open}
        handleCloseModal={handleCloseModal}
        isAccessRequestModal={true}
        form={Form}
        defaultData={defaultData}
      />
      <Table
        columns={columns}
        data={filteredData}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
      />
      <CustomSnackbar message={message} status={status} />
    </>
  );
};

export default AccessRequestTableContainer;
