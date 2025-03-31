import React, { useState } from 'react';
import { Avatar, Stack, AvatarGroup, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { contentFiltersState, authorNameState } from 'store/contentStore';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: '10px',
  height: '25px',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {},
}));

export default function ContentAvatar({ topAccountData }) {
  const [countToShow, setCountToShow] = useState(6);
  const [buttonCount, setButtobCount] = useState(5);
  const [filters, setFilters] = useRecoilState(contentFiltersState);
  const setAuthorName = useSetRecoilState(authorNameState);

  const increaseHandler = () => {
    setCountToShow((prev) => prev + 5);
  };

  const filterAuthorContentHandler = (id) => {
    setFilters((prevState) => ({
      ...prevState,
      creatorId: id,
    }));
  };

  const setAuthorNameHandler = (first, last) => {
    setAuthorName((prev) => ({
      ...prev,
      first,
      last,
    }));
  };

  useEffect(() => {
    if (countToShow === 21) {
      setButtobCount(0);
    }
  }, [countToShow]);

  return (
    <Box>
      <Typography variant='body1' color='text.secondary'>
        Filter by Top Authors
      </Typography>
      <Stack direction='row'>
        <AvatarGroup
          spacing={0}
          max={countToShow}
          sx={{
            display: 'flex',
            flexWrap: 'wrap-reverse',
            justifyContent: 'start',
            width: '370px',
          }}
        >
          {topAccountData?.map((item) => (
            <Avatar
              key={item.id}
              sx={{
                cursor: 'pointer',
                width: 41,
                height: 41,
                textAlign: 'center',
                color: '#1976d2',
                fontSize: '1.2rem',
                boxShadow: 10,
                backgroundColor: 'rgb(210,180,140)',
                marginRight: '5px',
                marginTop: '5px',
                borderColor:
                  filters.creatorId === item.id && '#1976d2!important',
              }}
              onClick={() => {
                filterAuthorContentHandler(item.id);
                setAuthorNameHandler(item.firstName, item.lastName);
              }}
              alt={item.firstName}
              src={item.thumbnailUrl}
              imgProps={{
                style: {},
              }}
            >
              {`${item.firstName && item.firstName[0]}${item.lastName && item.lastName[0]}`}
            </Avatar>
          ))}
        </AvatarGroup>
      </Stack>
      <CustomButton
        variant='outlined'
        onClick={increaseHandler}
        disabled={countToShow === 21 && true}
      >
        +{buttonCount}
      </CustomButton>
    </Box>
  );
}

ContentAvatar.propTypes = {
  topAccountData: PropTypes.array,
};
