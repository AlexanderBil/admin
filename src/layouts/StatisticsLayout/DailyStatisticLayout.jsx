import React, { useState, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  dailyStatisticDateState,
  dailyStatisticState,
} from 'store/statisticsStore';
import LocalizedDatePicker from '../../components/LocalizedDatePicker';
import { styled } from '@mui/material/styles';
import Table from 'components/Table';
import Box from '@mui/material/Box';
import { Button, Typography, useMediaQuery } from '@mui/material';
import {
  useSetDateToSetDateFrom,
  createFilterDailyStatisticsData,
  createFinalStatisticData,
} from './utilsFunctions';

import { TRANSACTION_FEE_LABELS } from '../../constants';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  totalBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    [theme.breakpoints.down('laptop')]: {},
  },
  totalBlockTitle: {
    fontSize: '16px',
    fontWeight: '600',
    borderBottom: '1px solid #000',
    width: 'fit-content',
    background: '#eeeeee',

    [theme.breakpoints.down('laptop')]: {},
  },
  resetButton: {
    height: '55px',
    padding: '7px',
    width: '130px',
    textTransform: 'none',
    fontSize: '16px',
    [theme.breakpoints.down('laptop')]: {
     width: '200px',
     height: '40px',
    },
    [theme.breakpoints.down('mobileL')]: {
      // marginTop: '15px',
    },
  },
}));

const StyledSpan = styled('span')({
  fontStyle: 'italic',
  marginLeft: '15px',
  fontWeight: 'bold',
});

const StyledTotalItemBox = styled('div')({
  fontSize: '16px',
});

const SpanBold = styled('span')({
  fontWeight: 'bold',
});

const DailyStatisticLayout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('laptop'));
  const { setDateStateFrom, setDateStateTo } = useSetDateToSetDateFrom();
  const { dailyStatistic } = useRecoilValue(dailyStatisticState);
  const dayFromdayToState = useRecoilValue(dailyStatisticDateState);
  const [allDay, setDay] = useState([]);
  const [allDayMs, setAllDayMs] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [allTableData, setAllTableData] = useState([]);

  const filterDateReset = useResetRecoilState(dailyStatisticDateState);

  const [publishedContentData, setPublishedContentData] = useState({
    data: [],
    count: 0,
  });

  const [mediaPassportsData, setMediaPassportsData] = useState({
    data: [],
    count: 0,
  });

  const [mintedNftsData, setMintedNftsData] = useState({
    data: [],
    count: 0,
  });

  const [dealsData, setdealsData] = useState({
    data: [],
    count: 0,
  });

  const [sponsorshipData, setSponsorshipData] = useState({
    data: [],
    count: 0,
  });

  const [feesData, setFeesData] = useState({
    data: [],
    count: 0,
  });

  const [filteredDealsData, setFilteredDealsData] = useState({
    data: [],
    count: 0,
  });

  const allFilterReset = () => {
    filterDateReset();
  };


  const columns = [
    {
      name: 'date',
      label: 'Date',
    },
    {
      name: 'publishContent',
      label: `${
        !matches
          ? `Published content (${publishedContentData.count})`
          : 'Published content'
      }`,
      renderCell: ({ publishContent }) => (
        <div>
          {publishContent.map((item, idx) => (
            <div key={idx}>
              {Object.keys(item)[0]} -{' '}
              <SpanBold>{item[Object.keys(item)[0]]}</SpanBold>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'mediaPassports',
      label: `${
        !matches
          ? `Media Passports (${mediaPassportsData.count})`
          : 'Media Passports'
      }`,
      renderCell: ({ mediaPassports }) => (
        <div>
          {mediaPassports.map((item, idx) => (
            <div key={idx}>
              {Object.keys(item)[0]} -{' '}
              <SpanBold>{item[Object.keys(item)[0]]}</SpanBold>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'mintedNfts',
      label: `${
        !matches ? `Minted NFTs (${mintedNftsData.count})` : 'Minted NFTs'
      }`,
      renderCell: ({ mintedNfts }) => (
        <div>
          {mintedNfts.map((item, idx) => (
            <div key={idx}>
              {Object.keys(item)[0]} -{' '}
              <SpanBold>{item[Object.keys(item)[0]]}</SpanBold>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'dealsData',
      label: `${!matches ? `Deals (${dealsData.count})` : 'Deals'}`,
      renderCell: ({ dealsData }) =>
        dealsData &&
        dealsData.length > 0 &&
        dealsData.map((item, idx) => (
          <div key={idx}>
            <div>{item.title}:</div>
            <div>
              {Object.keys(item).map(
                (item2, idx2) =>
                  item2 !== 'title' && (
                    <StyledSpan key={idx2}>
                      {item2} - {item[item2]}
                    </StyledSpan>
                  )
              )}
            </div>
          </div>
        )),
    },
    {
      name: 'sponsorship',
      label: `${
        !matches
          ? `Sponsorship deals (${sponsorshipData.count})`
          : 'Sponsorship deals'
      }`,
      renderCell: ({ sponsorship }) =>
        sponsorship.map(
          ({ classification, counter, acquisition }, idx) =>
            classification &&
            counter && (
              <div key={idx}>
                {acquisition}:
                <StyledSpan>
                  {' '}
                  {classification && counter
                    ? `${classification} - ${counter}`
                    : ''}
                </StyledSpan>
              </div>
            )
        ),
    },
    {
      name: 'feeds',
      label: `${!matches ? `Feeds (${feesData.count})` : 'Feeds'}`,
      renderCell: ({ feeds }) =>
        feeds.map(
          ({ classification, amount }, idx) =>
            classification &&
            amount && (
              <div key={idx}>
                {TRANSACTION_FEE_LABELS[classification]} -{' '}
                <SpanBold>{amount}</SpanBold>
              </div>
            )
        ),
    },
  ];

  useEffect(() => {
    let arr = [];
    allDay.map((item) => {
      arr.push({ date: item });
    });
    setTableData(arr);
  }, [allDay]);

  useEffect(() => {
    let newArr2 = [...tableData];
    publishedContentData.data.map((item, idx) => {
      let newArr = [];
      item.map(({ classification, counter }, index) => {
        classification && counter && newArr.push({ [classification]: counter });
        newArr2[idx].publishContent = newArr;
      });
    });
    setAllTableData(newArr2);
  }, [publishedContentData, tableData]);

  useEffect(() => {
    let newArr2 = [...tableData];
    mediaPassportsData.data.map((item, idx) => {
      let newArr = [];
      item.map(({ classification, counter }, index) => {
        classification && counter && newArr.push({ [classification]: counter });
        newArr2[idx].mediaPassports = newArr;
      });
    });
    setAllTableData(newArr2);
  }, [mediaPassportsData, tableData]);

  useEffect(() => {
    let newArr2 = [...tableData];
    mintedNftsData.data.map((item, idx) => {
      let newArr = [];
      item.map(({ classification, counter }, index) => {
        classification && counter && newArr.push({ [classification]: counter });
        newArr2[idx].mintedNfts = newArr;
      });
    });
    setAllTableData(newArr2);
  }, [mintedNftsData, tableData]);

  useEffect(() => {
    let newArr2 = [...tableData];
    filteredDealsData.length === newArr2.length &&
      filteredDealsData.map((item, idx) => {
        let newArr = [];
        item.map((obj, idx1) => {
          obj.title && newArr.push(obj);
        });
        newArr2[idx].dealsData = newArr;
      });
    setAllTableData(newArr2);
  }, [filteredDealsData, tableData]);

  useEffect(() => {
    let newArr2 = [...tableData];
    sponsorshipData.data.map((item, idx) => {
      let newArr = [];
      item.map((item2, index) => {
        newArr.push(item2);
      });
      newArr2[idx].sponsorship = newArr;
    });
    setAllTableData(newArr2);
  }, [sponsorshipData, tableData]);

  useEffect(() => {
    let newArr2 = [...tableData];
    feesData.data.map((item, idx) => {
      let newArr = [];
      item.map((item, index) => {
        newArr.push(item);
      });
      newArr2[idx].feeds = newArr;
    });
    setAllTableData(newArr2);
  }, [feesData.data, tableData]);

  useEffect(() => {
    setDay((prev) => (prev = []));
    setAllDayMs((prev) => (prev = []));

    for (
      let i = dayFromdayToState.dateFrom;
      i <= dayFromdayToState.dateTo;
      i = i + 24 * 60 * 60 * 1000
    ) {
      setDay((prev) => [
        ...prev,
        new Date(i)
          .toISOString()
          .substring(0, 10)
          .split('-')
          .reverse()
          .join('-'),
      ]);
      setAllDayMs((prev) => [...prev, new Date(i).getTime()]);
    }
  }, [dayFromdayToState]);

  useEffect(() => {
    createStructureDataForTable(
      dailyStatistic.publishedEntitiesPerDay,
      allDayMs
    );
    createStructureDataForTable(dailyStatistic.mintedNftsPerDay, allDayMs);
    createStructureDataForTable(dailyStatistic.dealsPerDay, allDayMs);
    createStructureDataForTable(
      dailyStatistic.sponsorshipDealsPerDay,
      allDayMs
    );
    createStructureDataForTable(dailyStatistic.feesPerDay, allDayMs);
    createStructureDataForTable(dailyStatistic.mintedPassportsPerDay, allDayMs);

    createFilterDailyStatisticsData(dealsData, setFilteredDealsData);
  }, [dailyStatistic, allDayMs]);

  useEffect(() => {
    createFilterDailyStatisticsData(dealsData, setFilteredDealsData);
  }, [allDayMs, dealsData, dailyStatistic]);

  const createStructureDataForTable = (statisticArr, dateArr) => {
    let newObj = [];
    let count = 0;
    dateArr.map((el) => {
      let arr = [];
      statisticArr.map((objEl) => {
        return objEl.date === el ? arr.push(objEl) : false;
      });
      if (arr.length !== 0) {
        return newObj.push(arr);
      } else {
        return newObj.push([{ date: el }]);
      }
    });

    statisticArr.map((item) => {
      if (item.counter) {
        return (count += item.counter);
      } else if (item.amount) {
        return (count += item.amount);
      }
    });

    const result = newObj.map((item) =>
      item.sort(function (a, b) {
        return b.date - a.date;
      })
    );

    createFinalStatisticData(
      statisticArr,
      dailyStatistic.publishedEntitiesPerDay,
      setPublishedContentData,
      result,
      count
    );

    createFinalStatisticData(
      statisticArr,
      dailyStatistic.mintedPassportsPerDay,
      setMediaPassportsData,
      result,
      count
    );

    createFinalStatisticData(
      statisticArr,
      dailyStatistic.mintedNftsPerDay,
      setMintedNftsData,
      result,
      count
    );

    createFinalStatisticData(
      statisticArr,
      dailyStatistic.dealsPerDay,
      setdealsData,
      result,
      count
    );

    createFinalStatisticData(
      statisticArr,
      dailyStatistic.sponsorshipDealsPerDay,
      setSponsorshipData,
      result,
      count
    );

    createFinalStatisticData(
      statisticArr,
      dailyStatistic.feesPerDay,
      setFeesData,
      result,
      count
    );
  };

  return (
    <Box style={{ marginTop: '50px' }}>
      <Typography
        sx={{ marginBottom: '20px', fontWeight: 700 }}
        variant='h5'
        component='h5'
      >
        Daily statistics
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: '550px',
          marginBottom: '15px',
          flexDirection: { mobileS: 'column', laptop: 'row' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { mobileS: 'left', laptop: 'center' },
            marginBottom: { mobileS: '15px', laptop: '0px' },
          }}
        >
          <LocalizedDatePicker
            setDay={setDateStateFrom}
            dateState={dayFromdayToState.dateFrom}
            label={'Date from'}
            width='200px'
            size={matches ? 'small' : 'medium'}
          />
          <SpanBold>Date from</SpanBold>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { mobileS: 'left', laptop: 'center' },
            marginBottom: { mobileS: '15px', laptop: '0px' },
          }}
        >
          <LocalizedDatePicker
            setDay={setDateStateTo}
            dateState={dayFromdayToState.dateTo}
            label={'Date to'}
            width='200px'
            size={matches ? 'small' : 'medium'}
          />
          <SpanBold>Date to</SpanBold>
        </Box>
        <Button
          className={classes.resetButton}
          variant='outlined'
          onClick={allFilterReset}
        >
          Reset All
        </Button>
      </Box>
      <hr />
      {matches && (
        <Box className={classes.totalBlock}>
          <Box className={classes.totalBlockTitle}>Total data:</Box>
          <StyledTotalItemBox>
            Published content:{' '}
            <span style={{ fontWeight: '500' }}>
              {publishedContentData.count}
            </span>
          </StyledTotalItemBox>
          <StyledTotalItemBox>
            Media Passports:{' '}
            <span style={{ fontWeight: '500' }}>
              {mediaPassportsData.count}
            </span>{' '}
          </StyledTotalItemBox>
          <StyledTotalItemBox>
            Minted NFTs:{' '}
            <span style={{ fontWeight: '500' }}> {mintedNftsData.count}</span>{' '}
          </StyledTotalItemBox>
          <StyledTotalItemBox>
            Deals: <span style={{ fontWeight: '500' }}>{dealsData.count}</span>{' '}
          </StyledTotalItemBox>
          <StyledTotalItemBox>
            Sponsorship deals:{' '}
            <span style={{ fontWeight: '500' }}>{sponsorshipData.count}</span>{' '}
          </StyledTotalItemBox>
          <StyledTotalItemBox>
            Feeds: <span style={{ fontWeight: '500' }}>{feesData.count}</span>{' '}
          </StyledTotalItemBox>
        </Box>
      )}

      <Table isNeadPagination={true} columns={columns} data={allTableData} />
    </Box>
  );
};

export default DailyStatisticLayout;
