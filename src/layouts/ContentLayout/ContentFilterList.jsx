import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  filteredContentAccount,
  dataFromSelectEmailContent,
  filtersByEmailContent,
  allUsersFiltersState,
} from 'store/contentStore';

import { ListItemButton } from '@mui/material';

export const ContentFilterList = () => {
  const filteredData = useRecoilValue(filteredContentAccount);
  const setUserData = useSetRecoilState(dataFromSelectEmailContent);
  const setFiltersAccount = useSetRecoilState(filtersByEmailContent);
  const setAllUsersFilters = useSetRecoilState(allUsersFiltersState);

  const filterListClickHandler = (item) => {
    setUserData({ ...item });
    setFiltersAccount((prev) => ({ ...prev, isShowFilterList: false }));
    setAllUsersFilters((prevState) => ({
      ...prevState,
      keyword: item.account?.email,
    }));
  };

  return (
    <List
      sx={{
        border: '1px solid grey',
        width: '100%',
        maxWidth: 360,
        bgcolor: '#f4f0ec',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {filteredData.data[1].map((item) => (
        <ListItem key={item.account.id} component='div' disablePadding>
          <ListItemButton
            sx={{ height: '40px' }}
            onClick={() => filterListClickHandler(item)}
          >
            <ListItemText primary={`${item.account.email}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
