import { Container, Box, Typography, Button } from '@mui/material';
import Thumbnail from 'components/Thumbnail';
import UserService from 'services/userService';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userDataState } from 'store/userStore';
import { Form } from './profileForm/Form';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import ModalWindow from '../../components/Modal';
import { FormPassword } from './passwordForm/FormPassword';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  profileBox: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
    },
  },
  informationBlock: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
  },
}));

const MyProfileContainer = () => {
  const classes = useStyles();
  const service = new UserService();
  const [user, setUser] = useRecoilState(userDataState);
  const [isEditing, setIsEditing] = useState(false);
  const [resetValue, setResetValue] = useState(false);
  const [saveValue, setSaveValue] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setResetValue(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSaveValue(true);
  };

  return (
    <Container className={classes.profileBox} maxWidth='xl'>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', marginBottom: '25px' }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '300px',
            height: '130px',
            borderRadius: '8px',
            background: '#F3F4F6',
            paddingLeft: '10px',
            marginRight: '30px',
            marginBottom: '20px',
          }}
        >
          <Thumbnail
            onUpdate={service.updateUserThumbnail}
            user={user}
            setUser={setUser}
          />
          <Box>
            <Typography variant='span' mr={1}>
              {user.first} {user.last}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={() => setOpenModal(true)}
          sx={{ width: '300px', textTransform: 'none' }}
          variant='outlined'
        >
          Change password
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '385px' }}>
        <Box className={classes.informationBlock}>
          <Typography
            sx={{ fontSize: '20px', marginRight: '20px', fontWeight: '500' }}
          >
            General Information
          </Typography>
          {!isEditing && (
            <Button
              sx={{ textTransform: 'none' }}
              onClick={handleEdit}
              variant='text'
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
          <Box>
            {isEditing && (
              <Button
                sx={{ marginRight: '10px' }}
                onClick={handleCancel}
                variant='text'
                startIcon={<ClearIcon />}
              >
                Cancel
              </Button>
            )}
            {isEditing && (
              <Button
                onClick={handleSave}
                variant='text'
                startIcon={<CheckIcon />}
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
        <Form
          setResetValue={setResetValue}
          resetValue={resetValue}
          isEditing={isEditing}
          user={user}
          setUser={setUser}
          saveValue={saveValue}
          setSaveValue={setSaveValue}
        />
      </Box>

      <ModalWindow
        open={openModal}
        handleCloseModal={() => setOpenModal(false)}
        form={FormPassword}
      />
    </Container>
  );
};

export default MyProfileContainer;
