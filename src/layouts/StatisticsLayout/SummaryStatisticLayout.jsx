import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { summaryStatisticState } from 'store/statisticsStore';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { TRANSACTION_FEE_LABELS_SUMMARY } from '../../constants';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tableBody: {
    display: 'flex',
    border: '1px solid #000',

    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
      border: 'none',
    },
  },
}));

const StyledSpanHead = styled('span')(({ theme }) => ({
  borderBottom: '1px solid #000',
  fontWeight: 'bold',
  [theme.breakpoints.down('laptop')]: {
  },
}));

const StyledSpan = styled('span')({
  fontWeight: 'bold',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid #000',

  '&:last-child': {
    // borderBottom: 'none',
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    height: '80px',
    padding: '10px',

    [theme.breakpoints.down('laptop')]: {
      height: 'auto',
      borderBottom: 'none',
    },
  },  

  div: {
    fontSize: '14px',
    display: 'inline-block',
    fontStyle: 'italic',
    marginRight: '10px',
    paddingLeft: '10px',
  },

  'div:nth-of-type(1)': {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '15px',
    display: 'block',
    paddingLeft: '0',
  }, 
  
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  borderRight: '1px solid #000',
  '&:last-child': {
    borderRight: 'none',
  },

  [theme.breakpoints.down('laptop')]: {
    border: '1px solid #000',
    marginBottom: '15px',
    '&:last-child': {
      borderRight: '1px solid #000',
    },
  },


  '& td: nth-of-type(odd)': {
    backgroundColor: '#eeeeee',
  },
  '& td: nth-of-type(even)': {
    backgroundColor: 'transparent',
  },
}));

const SummaryStatisticLayout = () => {
  const classes = useStyles();
  const { summaryStatistic } = useRecoilValue(summaryStatisticState);

  const [totalDiels, setTotalDiels] = useState([]);
  const [sponsorshipDiels, setSponsorshipDiels] = useState([]);

  const createStructureDataForTable = (arr, acquisitionName) => {
    const newArr = [];
    const obj = {};
    let counterSum = 0;

    arr.map((item) => {
      if (item.acquisition === acquisitionName) {
        counterSum += item.counter;
        obj[item.acquisition] = counterSum;
      }

      if (
        item.acquisition === acquisitionName &&
        item.classification === 'Article'
      ) {
        return (obj[item.classification] = item.counter);
      }

      if (
        item.acquisition === acquisitionName &&
        item.classification === 'Audio'
      ) {
        return (obj[item.classification] = item.counter);
      }

      if (
        item.acquisition === acquisitionName &&
        item.classification === 'Poster'
      ) {
        return (obj[item.classification] = item.counter);
      }

      if (
        item.acquisition === acquisitionName &&
        item.classification === 'VideoRecord'
      ) {
        return (obj[item.classification] = item.counter);
      }
    });
    newArr.push(obj);

    if (arr === summaryStatistic.deals) {
      return setTotalDiels((prev) => [...prev, ...newArr]);
    }
    if (arr === summaryStatistic.sponsorshipDeals) {
      return setSponsorshipDiels((prev) => [...prev, ...newArr]);
    }
  };

  useEffect(() => {
    createStructureDataForTable(summaryStatistic.deals, 'Deployment');
    createStructureDataForTable(summaryStatistic.deals, 'License');
    createStructureDataForTable(summaryStatistic.deals, 'NFT');
    createStructureDataForTable(summaryStatistic.deals, 'WaiverOwnership');
    createStructureDataForTable(summaryStatistic.sponsorshipDeals, 'NFT');
    createStructureDataForTable(summaryStatistic.sponsorshipDeals, 'License');
  }, [summaryStatistic.deals, summaryStatistic.sponsorshipDeals]);

  return (
    <TableContainer sx={{
      boxShadow: {
        mobileS: 'none',
        tablet: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      },
    }}  component={Paper}>
      <Typography
        sx={{
          fontWeight: 700,
          marginBottom: '10px',
        }}
        variant='h5'
        component='h5'
      >
        Summary
      </Typography>
      <Table
        sx={{ minWidth: { laptopL: '700px' } }}
        aria-label='customized table'
      >
        <TableBody className={classes.tableBody}>
          
          <StyledTableRow
            sx={{
              flex: '0 1 16%',
            }}
          >
            <StyledTableCell  align='left'>
              <StyledSpanHead>
                Active content now ({summaryStatistic.totalActiveContent})
              </StyledSpanHead>
            </StyledTableCell>
            {summaryStatistic.activeEntities.map(
              ({ classification, counter }) => (
                <StyledTableCell  key={classification} align='left'>
                  {classification} - <StyledSpan>{counter}</StyledSpan>
                </StyledTableCell>
              )
            )}
          </StyledTableRow>

          <StyledTableRow
            sx={{
              flex: '0 1 16%',
            }}
          >
            <StyledTableCell align='left'>
              <StyledSpanHead>
                Total MediaPassports ({summaryStatistic.totalPassport})
              </StyledSpanHead>
            </StyledTableCell>
            {summaryStatistic.mintedPassports.map(
              ({ classification, counter }) => (
                <StyledTableCell key={classification} align='left'>
                  {classification} - <StyledSpan>{counter}</StyledSpan>
                </StyledTableCell>
              )
            )}
            <StyledTableCell />
            <StyledTableCell />
          </StyledTableRow>

          <StyledTableRow
            sx={{
              flex: '0 1 14%',
            }}
          >
            <StyledTableCell align='left'>
              {' '}
              <StyledSpanHead>
                Total minted NFTs ({summaryStatistic.totalNft})
              </StyledSpanHead>
            </StyledTableCell>
            {summaryStatistic.mintedNfts.map(({ classification, counter }) => (
              <StyledTableCell key={classification} align='left'>
                {classification} - <StyledSpan>{counter}</StyledSpan>
              </StyledTableCell>
            ))}
          </StyledTableRow>

          <StyledTableRow
            sx={{
              flex: '0 1 18%',
            }}
          >
            <StyledTableCell align='left'>
              <StyledSpanHead>
                Total deals ({summaryStatistic.totalDeals})
              </StyledSpanHead>
            </StyledTableCell>
            {totalDiels.map((item, index) => (
              <StyledTableCell key={index} align='left'>
                {Object.keys(item).map((elem) => (
                  <div key={elem}>{`${elem} - ${item[elem]}`}</div>
                ))}
              </StyledTableCell>
            ))}
          </StyledTableRow>

          <StyledTableRow
            sx={{
              flex: '0 1 18%',
            }}
          >
            <StyledTableCell align='left'>
              <StyledSpanHead>
                Sponsorship deals ({summaryStatistic.totalSponsorshipDeals})
              </StyledSpanHead>
            </StyledTableCell>
            {sponsorshipDiels.map((item, index) => (
              <StyledTableCell key={index} align='left'>
                {Object.keys(item).map((elem) => (
                  <div key={elem}>{`${elem} - ${item[elem]}`}</div>
                ))}
              </StyledTableCell>
            ))}
            <StyledTableCell />
            <StyledTableCell />
          </StyledTableRow>

          <StyledTableRow
            sx={{
              flex: '0 1 18%',
              border: 'none'
            }}
          >
            <StyledTableCell align='left'>
              <StyledSpanHead>
                Total fees ({summaryStatistic.sumFees})
              </StyledSpanHead>
            </StyledTableCell>
            {summaryStatistic.fees.map(({ classification, amount }) => (
              <StyledTableCell  key={classification} align='left'>
                {TRANSACTION_FEE_LABELS_SUMMARY[classification]} -{' '}
                <StyledSpan>{amount}</StyledSpan>
              </StyledTableCell>
            ))}
          </StyledTableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryStatisticLayout;
