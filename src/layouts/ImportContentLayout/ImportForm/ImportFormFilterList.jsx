import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  filteredImportContentAccount,
  fullUserSelectData,
  filtersEmailImportContent,
} from 'store/importContentStore';
import { ListItemButton } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const ImportFormFilterList = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));
  const filteredData = useRecoilValue(filteredImportContentAccount);
  const [userData, setUserData] = useRecoilState(fullUserSelectData);
  const setFiltersAccount = useSetRecoilState(filtersEmailImportContent);

  const filterListClickHandler = (item) => {
    setUserData({ ...item });
    setFiltersAccount((prev) => ({ ...prev, isShowFilterList: false }));
  };

  return (
    filteredData.data[1].length !== 0 && (
      <List
        sx={{
          borderRadius: '8px',
          marginTop: '40px',
          position: 'absolute',
          zIndex: '10',
          border: '1px solid grey',
          width: '100%',
          maxWidth: matches ? '290px' : '500px',
          bgcolor: '#E0FFFF',
          overflow: 'auto',
          maxHeight: 350,
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
    )
  );
};

ImportFormFilterList.propTypes = {
  filteredData: PropTypes.array,
};
