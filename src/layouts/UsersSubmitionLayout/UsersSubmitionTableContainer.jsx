import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import { Box, Button, Link } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalWindow from '../../components/Modal';
import { UsersSubmitionForm } from '../../components/Form/UsersSubmitionForm';
import { styled } from '@mui/material/styles';

import { CustomSnackbar } from '../../components/CustomSnackbar/CustomSnackbar';
import {
  usersSubmitionFiltersState,
  usersSubmitionState,
  openModal,
  usersSubmitionResponseData,
  filteredUsersSubmitionState,
} from 'store/usersSubmitionStore';

import { idAndStatusInfo } from 'store/usersSubmitionStore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  fileBlock: {
    maxWidth: '300px',
    minWidth: '150px',
    wordBreak: 'break-all',
    [theme.breakpoints.down('tablet')]: {
      maxWidth: '180px',
    },
  },
}));

const UsersSubmitionTableContainer = () => {
  const classes = useStyles();
  const CancelButton = styled(Button)(() => ({
    color: '#fff',
    minWidth: '145px',
    fontSize: '12px',
    padding: '6px 0px',

    backgroundColor: '#d9534f',
    '&:hover': {
      backgroundColor: '#d02d2d',
    },
  }));

  const filterUsers = useRecoilValue(filteredUsersSubmitionState);
  const [{ open }, setOpen] = useRecoilState(openModal);
  const { pagination } = useRecoilValue(usersSubmitionState);
  const setFilters = useSetRecoilState(usersSubmitionFiltersState);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [valueToOrderBy, setValueToOrderBy] = useState('created');
  const [responseData, setResponseData] = useRecoilState(
    usersSubmitionResponseData
  );
  const setUserFilter = useSetRecoilState(idAndStatusInfo);

  const handleRequestSort = (event, property) => {
    setValueToOrderBy(property);
  };

  const handleCloseModal = () => {
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const cancelHandler = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setUserFilter((prev) => ({
      ...prev,
      userId: id,
      userStatus: 'CANCELED',
      status: 'Canceled',
      formTitleName: 'Cancel',
    }));
  };

  const approveHandler = (id) => {
    setOpen((prev) => ({ ...prev, open: true }));
    setUserFilter((prev) => ({
      ...prev,
      userId: id,
      userStatus: 'DONE',
      status: 'Done',
      formTitleName: 'Approve',
    }));
  };

  useEffect(() => {
    if (responseData.response?.status === 200) {
      setFilters((prevState) => ({ ...prevState }));
      setStatus(200);
      setMessage('Success submission!');
      setOpen((prev) => ({ ...prev, open: false }));
      setResponseData({});
      setTimeout(() => {
        setStatus(0);
      }, 1000);
    }
  }, [responseData]);

  const columns = [
    {
      name: 'name',
      label: 'Name',
      renderCell: ({ name }) => (
        <Box>
          <Box>{name}</Box>
        </Box>
      ),
    },
    {
      name: 'email',
      label: 'Email',
      renderCell: ({ email, ip }) => (
        <Box>
          <Box>{email}</Box>
          <Box>{ip}</Box>
        </Box>
      ),
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'resource',
      label: 'File',
      renderCell: ({ resource }) => (
        <Box className={classes.fileBlock}>
          <Link style={{ color: '#000' }} href={resource}>
            {resource}
          </Link>
        </Box>
      ),
    },
    {
      name: 'event',
      label: 'Event',
    },
    {
      name: 'comment',
      label: 'Comment',
    },
    {
      name: 'created',
      label: 'Creation date',
      renderCell: ({ created }) => (
        <Box>{new Date(created).toLocaleString()}</Box>
      ),
    },
    {
      name: 'updated',
      label: 'Updated',
      renderCell: ({ updated, fullName }) =>
        updated && (
          <Box>
            <Box>{fullName}</Box>
            <Box>{new Date(updated).toLocaleString()}</Box>
          </Box>
        ),
    },
    {
      name: '',
      label: '',
      renderCell: ({ id, status }) => {
        if (status === 'Pending') {
          return (
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                sx={{
                  marginBottom: '10px',
                  fontSize: '12px',
                  minWidth: '145px',
                }}
                variant='contained'
                onClick={() => approveHandler(id)}
              >
                Approve
              </Button>
              <CancelButton onClick={() => cancelHandler(id)}>
                Cancel
              </CancelButton>
            </Box>
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
        form={UsersSubmitionForm}
      />
      <Table
        columns={columns}
        data={filterUsers}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 15, 20]}
        isNeadTableSortLabel={true}
        valueToOrderBy={valueToOrderBy}
        handleRequestSort={handleRequestSort}
      />
      <CustomSnackbar message={message} status={status} />
    </>
  );
};

export default UsersSubmitionTableContainer;
