import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { contentFiltersState, tabsState } from 'store/contentStore';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ContentTypeTabs({ checkboxGroup }) {
  const [filters, setFilters] = useRecoilState(contentFiltersState);
  const [tabsData, setTabsData] = useRecoilState(tabsState);

  const handleChange = (event, newValue) => {
    setTabsData((prev) => ({
      ...prev,
      value: newValue,
    }));
    if (newValue === 0) {
      let cloneFilters = filters;
      const { adOptions, ...newArr } = cloneFilters;
      newArr.classifications = ['Article'];
      setFilters(newArr);
    }
    if (newValue === 1) {
      let cloneFilters = filters;
      const { adOptions, ...newArr } = cloneFilters;
      newArr.classifications = ['VideoRecord'];
      setFilters(newArr);
    }
    if (newValue === 2) {
      let cloneFilters = filters;
      const { adOptions, ...newArr } = cloneFilters;
      newArr.classifications = ['Audio'];
      setFilters(newArr);
    }
    if (newValue === 3) {
      let cloneFilters = filters;
      const { adOptions, ...newArr } = cloneFilters;
      newArr.classifications = ['Poster'];
      setFilters(newArr);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='scrollable'
          value={tabsData.value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Article' {...a11yProps(0)} />
          <Tab label='Video' {...a11yProps(1)} />
          <Tab label='Audio' {...a11yProps(2)} />
          <Tab label='Poster' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={tabsData.value} index={0}>
        {checkboxGroup()}
      </TabPanel>
      <TabPanel value={tabsData.value} index={1}></TabPanel>
      <TabPanel value={tabsData.value} index={2}></TabPanel>
      <TabPanel value={tabsData.value} index={3}></TabPanel>
    </Box>
  );
}

ContentTypeTabs.propTypes = {
  checkboxGroup: PropTypes.func,
};
