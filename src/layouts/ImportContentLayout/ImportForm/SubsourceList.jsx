import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  portalEdicaseSelectData,
  sourceListState,
} from 'store/importContentStore';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SubsourceList = ({ sourceValue, setFocuseField, portalEdicaseValue }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));
  const [subsourceListData, setSubsourceListData] = useRecoilState(
    portalEdicaseSelectData
  );

  const { sourceList } = useRecoilValue(sourceListState);
  const subsourceList = sourceList.filter((item) => item.id === sourceValue);

  useEffect(() => {
    if (portalEdicaseValue.length === 0) {
      setSubsourceListData((prev) => ({
        ...prev,
        keyword: '',
      }));
    }
  }, [portalEdicaseValue]);

  const filteredPortalEdicaseData = useMemo(() => {
    if (!subsourceListData.keyword) {
      return subsourceList[0].items;
    }

    return subsourceList[0].items.filter((item) => {
      return item.value
        .toLowerCase()
        .includes(subsourceListData.keyword?.toLowerCase());
    });
  }, [subsourceListData.keyword]);

  const setFilteredSourceListHandler = (item) => {
    setSubsourceListData((prev) => ({
      ...prev,
      value: item,
      isShowFilterList: false,
    }));
  };

  return (
    filteredPortalEdicaseData.length !== 0 && (
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
        {filteredPortalEdicaseData.map((item) => (
          <ListItem key={item.value} component='div' disablePadding>
            <ListItemButton
              sx={{ height: '40px' }}
              onClick={() => {
                setFilteredSourceListHandler(item.value);
                setFocuseField(false);
              }}
            >
              <ListItemText primary={`${item.value}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )
  );
};

export default SubsourceList;

SubsourceList.propTypes = {
  sourceValue: PropTypes.number,
  setFocuseField: PropTypes.func,
  portalEdicaseValue: PropTypes.string,
};
