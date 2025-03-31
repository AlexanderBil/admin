import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  filteredSendFundsAccount,
  filtersByEmail,
  fullDataFromSelectEmail,
} from 'store/sendFundsStore';
import {
  filteredNftAccount,
  filterByEmail,
  fullDataFromUser,
} from 'store/nftSponsorshipStore';
import { ListItemButton } from '@mui/material';

export const FundsFormFilterList = ({ isFunds }) => {
  const filteredData = useRecoilValue(isFunds ? filteredSendFundsAccount : filteredNftAccount);
  const setUserData = useSetRecoilState(isFunds ? fullDataFromSelectEmail : fullDataFromUser);

  const setFiltersAccount = useSetRecoilState( isFunds ? filtersByEmail : filterByEmail);

  const filterListClickHandler = (item) => {
    setUserData({ ...item });
    setFiltersAccount((prev) => ({ ...prev, isShowFilterList: false }));
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

FundsFormFilterList.propTypes = {
  isFunds: PropTypes.bool.isRequired,
};
