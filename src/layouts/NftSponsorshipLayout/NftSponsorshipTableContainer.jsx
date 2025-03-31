import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from 'components/Table';
import { Box, Typography, Button } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalWindow from '../../components/Modal';

import {
  nftSponsorshipFiltersState,
  nftSponsorshipState,
  openNftModal,
  contentIdAndStatusInfo,
  nftResponseData,
  filteredNftSponsorshipState,
} from 'store/nftSponsorshipStore';
import { ContentTableCell } from './cells/ContentTableCell';
import { NameTableCell } from './cells/NameTableCell';
import { TransactionTableCell } from './cells/TransactionTableCell';
import { NftSponsorshipForm } from 'components/Form/NftSponsorshipForm';
import { CustomSnackbar } from 'components/CustomSnackbar/CustomSnackbar';
import { UpdatedByTableCell } from './cells/UpdatedBy';

const InvitationButton = styled(Button)(() => ({
  color: '#fff',
  padding: '6px 0px',
  backgroundColor: '#1d5f14',
  fontSize: '12px',
  maxWidth: '145px',
  '&:hover': {
    backgroundColor: '#193910',
  },
}));

const NftSponsorshipTableContainer = () => {
  const filterSponsorship = useRecoilValue(filteredNftSponsorshipState);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const { sponsorship } = useRecoilValue(nftSponsorshipState);
  const { pagination } = useRecoilValue(nftSponsorshipState);
  const setFilters = useSetRecoilState(nftSponsorshipFiltersState);
  const [valueToOrderBy, setValueToOrderBy] = useState('created');
  const [{ open }, setOpen] = useRecoilState(openNftModal);
  const [actionFilter, setActionFilter] = useRecoilState(
    contentIdAndStatusInfo
  );
  const [responseData, setResponseData] = useRecoilState(nftResponseData);

  const handleRequestSort = (event, property) => {
    setValueToOrderBy(property);
  };

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const handleCloseModal = () => {
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const voidHandler = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setActionFilter((prev) => ({
      ...prev,
      id: id,
      status: 'Voided',
      formTitle: 'Void payment',
      isVoidForm: true,
    }));
  };

  const completeHandler = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setActionFilter((prev) => ({
      ...prev,
      id: id,
      status: 'Done',
      formTitle: 'Complete payment',
      isVoidForm: false,
    }));
  };

  useEffect(() => {
    if (responseData.response?.status === 200) {
      setFilters((prevState) => ({ ...prevState }));
      setStatus(200);
      setMessage(
        actionFilter.isVoidForm ? 'Void success!' : 'Completion success!'
      );
      setOpen((prev) => ({ ...prev, open: false }));
      setResponseData({});
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
  }, [responseData]);

  const columns = [
    {
      name: 'content',
      label: 'Content',
      renderCell: ({
        title,
        classification,
        contentId,
        status,
        blockchain,
        tokenId,
        smartContract,
        imageUrl,
        statusContent,
        attributes
      }) => (
        <ContentTableCell
          title={title}
          classification={classification}
          contentId={contentId}
          status={status}
          blockchain={blockchain}
          tokenId={tokenId}
          smartContract={smartContract}
          imageUrl={imageUrl}
          statusContent={statusContent}
          attributes={attributes}
        />
      ),
    },
    {
      name: 'name',
      label: 'User name, Email',
      renderCell: ({
        email,
        name,
        ip,
        wallet,
        accountEmail,
        accountUserName,
      }) => (
        <NameTableCell
          email={email}
          name={name}
          ip={ip}
          wallet={wallet}
          accountEmail={accountEmail}
          accountUserName={accountUserName}
        />
      ),
    },
    {
      name: 'transaction',
      label: 'Transaction',
      renderCell: ({
        transactionId,
        dealTransactionId,
        acquisitionModel,
        blockchain,
        sourceUrl,
        depositWallet,
        promoCode,
        promoCodePartner,
        sourcePartner,
      }) => (
        <TransactionTableCell
          transactionId={transactionId}
          dealTransactionId={dealTransactionId}
          acquisitionModel={acquisitionModel}
          blockchain={blockchain}
          sourceUrl={sourceUrl}
          depositWallet={depositWallet}
          promoCode={promoCode}
          promoCodePartner={promoCodePartner}
          sourcePartner={sourcePartner}
        />
      ),
    },
    {
      name: 'amount',
      label: 'Price',
      renderCell: ({ amount, currency }) => (
        <Box sx={{ minWidth: '55px' }}>
          {amount ? (
            <Box>
              {amount} {currency}
            </Box>
          ) : null}
        </Box>
      ),
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'description',
      label: 'Description',
      renderCell: ({ description }) => (
        <Box sx={{ minWidth: '200px', maxWidth: '200px', wordBreak: 'break-all' }}>
          {description}
        </Box>
      ),
    },
    {
      name: 'created',
      label: 'Created by',
      renderCell: ({ created }) => (
        <Box>{new Date(created).toLocaleString()}</Box>
      ),
    },

    {
      name: 'updated',
      label: 'Updated by',
      renderCell: ({ updated, updatedBy, updatedByEmail }) => (
        <UpdatedByTableCell
          updated={updated}
          updatedBy={updatedBy}
          updatedByEmail={updatedByEmail}
        />
      ),
    },
    {
      name: 'action',
      label: 'Action',
      renderCell: ({ status, id }) =>
        status === 'Active' && (
          <Box
            style={{ display: 'flex', flexDirection: 'column', width: '120px' }}
          >
            <Button
              sx={{ marginBottom: '10px', fontSize: '12px', maxWidth: '245px' }}
              variant='contained'
              onClick={() => voidHandler(id)}
            >
              Void
            </Button>
            <InvitationButton onClick={() => completeHandler(id)}>
              Complete
            </InvitationButton>
          </Box>
        ),
    },
  ];

  return (
    <>
      <hr style={{ borderColor: '#f7fafc5c' }} />
      <ModalWindow
        open={open}
        handleCloseModal={handleCloseModal}
        form={NftSponsorshipForm}
      />
      <Table
        columns={columns}
        data={filterSponsorship}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
        valueToOrderBy={valueToOrderBy}
        handleRequestSort={handleRequestSort}
        alignTop={true}
      />
      {sponsorship.length === 0 && (
        <Typography variant='h6'>No data</Typography>
      )}
      <CustomSnackbar message={message} status={status} />
    </>
  );
};

export default NftSponsorshipTableContainer;
