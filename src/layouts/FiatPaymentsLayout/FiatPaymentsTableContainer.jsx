import React from 'react';
import Table from 'components/Table';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Avatar } from '@mui/material';
import { Box } from '@mui/material';
import {
  fiatPaymentsFiltersState,
  fiatPaymentsState,
} from 'store/fiatPaymentsStore';
import { CodeTableCell } from './cells/CodeTableCell';
import { PaymentIdTableCell } from './cells/PaymentIdTableCell';
import { ScenarioTypeCell } from './cells/ScenarioTypeCell';
import { TransactionTableCell } from './cells/TransactionTableCell';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  userBox: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
}));

const FiatPaymentsTableContainer = () => {
  const classes = useStyles();
  const { payments, pagination } = useRecoilValue(fiatPaymentsState);
  const setFilters = useSetRecoilState(fiatPaymentsFiltersState);


  const columns = [
    {
      name: 'account',
      label: 'Account',
      renderCell: ({ first, last, thumbnailUrl, email }) => (
        <Box className={classes.userBox}>
          <Avatar
            sx={{ marginRight: { mobileS: '0px', tablet: '15px' } }}
            src={thumbnailUrl}
            alt={`${first} ${last} avatar`}
          >{`${first && first[0]}${last && last[0]}`}</Avatar>
          <Box>
            <Box>{email}</Box>
            <Box>{`${first} ${last}`}</Box>
          </Box>
        </Box>
      ),
    },
    {
      name: 'totalAmount',
      label: 'Total amount',
      renderCell: ({ totalAmount, currency }) => (
        <Box sx={{ minWidth: '55px' }}>
          {totalAmount ? (
            <Box>
              {totalAmount} {currency}
            </Box>
          ) : null}
        </Box>
      ),
    },
    {
      name: 'amount',
      label: 'Amount',
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
      name: 'fee',
      label: 'Fee',
      renderCell: ({ fee }) => (
        <Box sx={{ minWidth: '55px' }}>{fee ? <Box>{fee}</Box> : 0}</Box>
      ),
    },
    {
      name: 'code',
      label: 'Code',
      renderCell: ({ code }) => <CodeTableCell code={code} />,
    },
    {
      name: 'paymentId',
      label: 'Payment id /   \nTransaction id',
      renderCell: ({ paymentId, transactionId }) => (
        <Box>
          <PaymentIdTableCell paymentId={paymentId} />
          <TransactionTableCell transactionId={transactionId} />
        </Box>
      ),
    },
    {
      name: 'scenarioType',
      label: 'Scenario Type',
      renderCell: ({ scenarioType, entityId }) => (
        <Box>
          <ScenarioTypeCell scenarioType={scenarioType} />
          {entityId && <Box>Entity: {entityId}</Box>}
        </Box>
      ),
    },
    {
      name: 'status',
      label: 'Status',
      renderCell: ({ status, description }) => {
        let str = status.toLowerCase();
        const capitalize = (str) => str[0].toUpperCase() + str.substring(1);
        return (
          <Box sx={{minWidth: '170px', width: '100%'}}>
            <Box>{capitalize(str)}</Box>
            {description && <Box>Description: {description}</Box>}
          </Box>
        );
      },
    },
    {
      name: 'created',
      label: 'Created',
      renderCell: ({ created }) => (
        <Box sx={{ maxWidth: '100px' }}>
          {new Date(created).toLocaleString()}
        </Box>
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
      data={payments}
      pagination={pagination}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handlePageSizeChange}
      rowsPerPageOptions={[5, 10, 15, 20]}
    />
  );
};

export default FiatPaymentsTableContainer;
