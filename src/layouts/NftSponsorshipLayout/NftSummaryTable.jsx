import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { nftSummaryState } from 'store/nftSponsorshipStore';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  paymentBlock: {
    marginBottom: '15px',
    padding: '0px 20px 0px 20px',
    borderRight: '1px solid #000',
    '&:first-child': {
      borderLeft: '1px solid #000',
    },
    [theme.breakpoints.down('tablet')]: {
      border: '1px solid #000',
      marginRight: '15px',
      width: '150px',
    },
  },
}));


const NftSummaryTable = () => {
  const { totalPayments } = useRecoilValue(nftSummaryState);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <>
      <hr style={{ borderColor: '#f7fafc5c' }} />
      <Box>
        {totalPayments ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {totalPayments.map((item) => (
              <Box className={classes.paymentBlock}>
                <Typography
                  sx={{
                    fontWeight: '500',
                    fontSize: '15px',
                    borderBottom: '1px solid #000',
                    background: '#eeeeee',
                  }}
                >
                  {item.status}
                </Typography>
                <Typography sx={{ fontSize: '15px' }}>
                  Total items: {item.records}
                </Typography>
                {item.payments.map((data) => (
                  <Typography sx={{ fontSize: '15px' }}>
                    {data.currency}: {data.amount}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NftSummaryTable;
