import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import { Box } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalWindow from '../../components/Modal';
import { SendFundsForm } from '../../components/Form/SendFundsForm';

import {
  sendFundsState,
  sendFundsFiltersState,
  isOpenModal,
  sendFundsResponseData,
} from 'store/sendFundsStore';
import { CustomSnackbar } from '../../components/CustomSnackbar/CustomSnackbar';
import { globalDetails } from '../../store/invitationStore';

const SendFundsTableContainer = () => {
  const { funds } = useRecoilValue(sendFundsState);
  const [{ open }, setOpen] = useRecoilState(isOpenModal);
  const { pagination } = useRecoilValue(sendFundsState);
  const setFilters = useSetRecoilState(sendFundsFiltersState);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useRecoilState(sendFundsResponseData);

  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';

  const handleCloseModal = () => {
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  useEffect(() => {
    if (responseData.response?.status === 200) {
      setStatus(200);
      setMessage('Success send funds!');
      setOpen((prev) => ({ ...prev, open: false }));
      setResponseData({});
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
  }, [responseData]);

  const columns = [
    {
      name: 'receiverAccount',
      label: 'Receiver',
      renderCell: ({ receiverAccount }) => (
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Box>{`${receiverAccount.first} ${receiverAccount.last}`}</Box>
            <Box
              sx={{
                width: { mobileS: '150px', tablet: '100%' },
                wordBreak: 'break-all',
              }}
            >
              {receiverAccount.email}
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      name: 'orderStatus',
      label: 'Status',
    },
    {
      name: 'eventId',
      label: 'Event Type',
    },
    {
      name: 'algo',
      label: 'Incentives',
      renderCell: ({ algo, asset }) => (
        <Box>
          <Box>{algo ? `${algo} ALGO` : '0 ALGO'}</Box>
          <Box>{asset ? `${asset} ${tokenName}` : `0 ${tokenName}`}</Box>
        </Box>
      ),
    },
    {
      name: 'comment',
      label: 'Comment',
    },
    {
      name: 'assetOptIn',
      label: 'Opting In',
      renderCell: ({ assetOptIn }) => <Box>{assetOptIn ? 'Yes' : 'No'}</Box>,
    },
    {
      name: 'created',
      label: 'Creation date',
      renderCell: ({ created }) => (
        <Box>{new Date(created).toLocaleString()}</Box>
      ),
    },
    {
      name: 'senderAccount',
      label: 'Sender',
      renderCell: ({ senderAccount }) => (
        <Box>
          {senderAccount?.first && senderAccount?.last ? (
            <Box>{`${senderAccount.first} ${senderAccount.last}`}</Box>
          ) : null}
          <Box>{senderAccount?.email}</Box>
        </Box>
      ),
    },
  ];

  return (
    <>
      <hr style={{ borderColor: '#f7fafc5c' }} />
      <CustomSnackbar message={message} status={status} />
      <ModalWindow
        open={open}
        handleCloseModal={handleCloseModal}
        isInvitationModal={true}
        form={SendFundsForm}
      />
      <Table
        columns={columns}
        data={funds}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
      />
      <CustomSnackbar message={message} status={status} />
    </>
  );
};

export default SendFundsTableContainer;
