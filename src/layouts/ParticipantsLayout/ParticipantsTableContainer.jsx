import React from 'react';
import Table from 'components/Table';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  participantsFiltersState,
  participantsState,
} from 'store/participantsStore';
import { Avatar } from '@mui/material';
import { ROLE_LABELS, SUB_ROLE_LABELS } from 'constants/';
import { WalletCell } from './cells/WalletCell';
import { Box } from '@mui/material';
import { BalanceCell } from './cells/BalanceCell';

const ParticipantsTableContainer = () => {
  const { participants, pagination } = useRecoilValue(participantsState);
  const setFilters = useSetRecoilState(participantsFiltersState);

  const columns = [
    {
      name: 'id',
      label: 'ID',
    },
    {
      name: 'thumbnailUrl',
      label: 'Avatar',
      renderCell: ({ thumbnailUrl, firstName, lastName }) => (
        <Avatar src={thumbnailUrl} alt={`${firstName} ${lastName} avatar`}>
          {`${firstName[0] || ''}${lastName[0] || ''}`}
        </Avatar>
      ),
    },
    {
      name: 'fullName',
      label: 'Name',
    },
    {
      name: 'email',
      label: 'Email',
      renderCell: ({ email }) => (
        <Box sx={{ minWidth: '100px', wordBreak: 'break-all' }} >{email}</Box>
      ),
    },
    {
      name: 'status',
      label: 'Status',
      renderCell: ({ profileData }) => (
        <>{profileData.status && <span>{profileData.status}</span>}</>
      ),
    },
    {
      name: 'origin',
      label: 'Origin',
      renderCell: ({ profileData }) => (
        <>{profileData.origin && <span>{profileData.origin}</span>}</>
      ),
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
      name: 'wallets',
      label: 'Wallet',
      renderCell: ({ wallets }) => {

        function SortArray(x, y) {
          return x.chain.localeCompare(y.chain);
        }

        const sortWallets = [...wallets].sort(SortArray)

        return <WalletCell wallets={sortWallets} />;
      },
    },
    {
      name: 'balance',
      label: 'Balance',
      renderCell: ({ id }) => <BalanceCell id={id} />,
    },
    {
      name: 'created',
      label: 'Created',
      renderCell: ({ created }) => (
        <Box>{new Date(created).toLocaleString()}</Box>
      ),
    },
  ];

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));
  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  return (
    <Table
      columns={columns}
      data={participants}
      pagination={pagination}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handlePageSizeChange}
      rowsPerPageOptions={[5, 10, 15, 20]}
    />
  );
};

export default ParticipantsTableContainer;
