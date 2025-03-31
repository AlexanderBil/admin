import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { obligationState } from 'store/invitationStore';
import { invitationStatuses, globalDetails } from '../../store/invitationStore';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  obligetionBox: {
    display: 'flex',
    marginLeft: '20px',

    [theme.breakpoints.down('laptop')]: {
      order: '-1',
      marginBottom: '20px',
      flexDirection: 'column',
      marginLeft: '0px',
    },
  },
  balanceBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    maxWidth: '660px',

    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  refreshButton: {
    padding: '6px 0px',
    fontSize: '12px',
    minWidth: '145px',
    marginRight: '65px',
    maxHeight: '35px',

    [theme.breakpoints.down('laptop')]: {
      padding: '9px 14px',
      marginRight: '14px',
      minWidth: '130px',
      maxHeight: '40px',
      marginTop: '15px',
    },
  },
  walletBox: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: '15px',

    [theme.breakpoints.down('laptop')]: {
      maxWidth: '300px',
      wordBreak: 'break-all',
    },
  },
}));

export const ObligetionsInfo = ({ isNeadContainer }) => {
  const classes = useStyles();
  const obligationData = useRecoilValue(obligationState);
  const setInvitationStatus = useSetRecoilState(invitationStatuses);
  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';

  return (
    <Container className={classes.obligetionBox} disableGutters={true}>
      {isNeadContainer && (
        <Container
          style={{
            marginLeft: 0,
            maxWidth: '230px',
            width: '100%',
          }}
          disableGutters={true}
        >
          <Box disableGutters={true}>
            <Typography sx={{ fontSize: '15px' }}>
              Active invitations:{' '}
              <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                {' '}
                {
                  obligationData.data.mpInvitationMetrics[0]
                    .totalInvitationsCount
                }
              </span>
            </Typography>
          </Box>
          <Box disableGutters={true}>
            <Typography sx={{ fontSize: '15px' }}>
              Obligations to pay ALGO:{' '}
              <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                {
                  obligationData.data.mpInvitationMetrics[0]
                    .totalAmountAlgoCoins
                }
              </span>
            </Typography>
          </Box>
          <Box disableGutters={true}>
            <Typography sx={{ fontSize: '15px' }}>
              Obligations to pay {tokenName}:{' '}
              <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                {obligationData.data.mpInvitationMetrics[0].totalAmountTokens}
              </span>
            </Typography>
          </Box>
        </Container>
      )}

      <Container
        style={{
          marginLeft: 0,
          width: '750px',
        }}
        disableGutters={true}
      >
        <Box className={classes.walletBox} disableGutters={true}>
          <Typography sx={{ fontSize: '15px' }}>
            Wallet: <span>{obligationData.data.walletName}</span>
          </Typography>
        </Box>
        <Box className={classes.balanceBlock}>
          <Box disableGutters={true}>
            <Typography sx={{ fontSize: '15px' }}>
              Balance in ALGO:{' '}
              <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                {obligationData.data.walletBalanceAlgo}
              </span>
            </Typography>
            <Typography sx={{ fontSize: '15px' }}>
              Balance in {tokenName}:{' '}
              <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                {obligationData.data.walletBalanceTokens}
              </span>
            </Typography>
          </Box>

          <Button
            className={classes.refreshButton}
            variant='contained'
            onClick={() =>
              setInvitationStatus((prev) => ({
                ...prev,
                invitationStatus: ['Active'],
              }))
            }
          >
            Refresh
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

ObligetionsInfo.propTypes = {
  isNeadContainer: PropTypes.bool.isRequired,
  dateState: PropTypes.number,
  label: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.string,
};
