import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Box, IconButton, Avatar } from '@mui/material';
import { useSnackbar } from 'notistack';

const Thumbnail = ({ onUpdate, user, setUser }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [color, setColor] = useState(0)

  const handleImageChange = ({ target }) => {
    if (!target.files.length) {
      return;
    }

    const imageFile = target.files[0];

    if (imageFile.size > 10485760) {
      // 10 Mb it's a max size
      return enqueueSnackbar('Cant upload photos larger than 10 Mb.', {
        variant: 'warning',
        autoHideDuration: 2000,
      });
    }

    const thumbnailData = {
      accountId: user.id,
      qquuid: uuid(),
      qqfilename: target.files[0].name,
      qqtotalfilesize: target.files[0].size,
      fileName: imageFile,
    };

    // this.store.fullScreenLoad = false;

    onUpdate(thumbnailData)
      .then((response) => {
        setUser((prev) => ({
          ...prev,
          thumbnailUrl: response.url,
        }));
        return enqueueSnackbar('Saved!', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(error.message || 'Error!', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <Box>
      <input
        accept='image/jpeg, image/png, image/pjpeg, image/gif'
        id='upload-avatar'
        type='file'
        hidden
        onChange={handleImageChange}
      />
      <label htmlFor='upload-avatar'>
        <IconButton
          sx={{
            width: '100px',
            height: '100px',
            marginRight: '10px',
            position: 'relative',
          }}
          component='span'
        >
          <Avatar
            sx={{
              width: '80px',
              height: '80px',
              '&:hover': { border: '2px solid #1976d2' },
            }}
            src={user.thumbnailUrl || ''}
            alt={'avatar'}
          />
        </IconButton>
      </label>
    </Box>
  );
};

export default Thumbnail;

Thumbnail.propTypes = {
  enqueueSnackbar: PropTypes.func,
  avatarImage: PropTypes.string,
  onUpdate: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
};
