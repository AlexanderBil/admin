import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { dateFromDateToImportContent } from 'store/importContentStore';
import { dateFromDateToDeploymentState } from 'store/deploymentRequestStore';
import { dateFromDateToPaymentState } from 'store/fiatPaymentsStore';
import { dateFromDateToState } from 'store/sendFundsStore';
import { dateFromDateToData } from 'store/usersSubmitionStore';
import { dateFromDateToInfo } from 'store/nftSponsorshipStore';
import { dailyStatisticDateState } from 'store/statisticsStore';
import { dayFromUtc } from 'store/statisticsStore';
import { dayToUtc } from 'store/statisticsStore';

export default function LocalizedDatePicker({
  setDay,
  dateState,
  label,
  size,
  width,
}) {
  const [datePickerValue, setDatePickerValue] = React.useState(null);
  const [datePickerValueStatistic, setDatePickerValueStatistic] =
    React.useState(dateState);

  const daylyStatisticsDate = useRecoilValue(dailyStatisticDateState);
  const importContentDate = useRecoilValue(dateFromDateToImportContent);
  const deploymentRequestDate = useRecoilValue(dateFromDateToDeploymentState);
  const fiatPaymentsDate = useRecoilValue(dateFromDateToPaymentState);
  const sendFundsDate = useRecoilValue(dateFromDateToState);
  const userSubmitionDate = useRecoilValue(dateFromDateToData);
  const nftSponsorshipDate = useRecoilValue(dateFromDateToInfo);


  React.useEffect(() => {
    if (
      daylyStatisticsDate.dateFrom === dayFromUtc &&
      daylyStatisticsDate.dateTo === dayToUtc
    ) {
      setDatePickerValueStatistic(dateState);
    }
  }, [daylyStatisticsDate, dateState]);

  React.useEffect(() => {
    if (
      importContentDate.dateFrom === null &&
      importContentDate.dateTo === null
    ) {
      setDatePickerValue(null);
    }
  }, [importContentDate]);

  React.useEffect(() => {
    if (sendFundsDate.dateFrom === null && sendFundsDate.dateTo === null) {
      setDatePickerValue(null);
    }
  }, [sendFundsDate]);

  React.useEffect(() => {
    if (
      nftSponsorshipDate.dateFrom === null &&
      nftSponsorshipDate.dateTo === null
    ) {
      setDatePickerValue(null);
    }
  }, [nftSponsorshipDate]);

  React.useEffect(() => {
    if (fiatPaymentsDate.from === null && fiatPaymentsDate.to === null) {
      setDatePickerValue(null);
    }
  }, [fiatPaymentsDate]);

  React.useEffect(() => {
    if (userSubmitionDate.from === null && userSubmitionDate.to === null) {
      setDatePickerValue(null);
    }
  }, [userSubmitionDate]);

  React.useEffect(() => {
    if (
      deploymentRequestDate.from === null &&
      deploymentRequestDate.to === null
    ) {
      setDatePickerValue(null);
    }
  }, [deploymentRequestDate]);

  const setDateHandler = (newValue) => {
    setDatePickerValue(newValue);
    dateState && setDatePickerValueStatistic(newValue);
    setDay(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          disableFuture={true}
          label={label}
          inputFormat='dd/MM/yyyy'
          value={
            dateState
              ? datePickerValueStatistic
              : !dateState
              ? datePickerValue
              : null
          }
          onChange={(newValue) => setDateHandler(newValue)}
          renderInput={(params) => (
            <TextField
              size={size}
              style={{
                width: width,
              }}
              {...params}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}

LocalizedDatePicker.propTypes = {
  setDay: PropTypes.any,
  dateState: PropTypes.number,
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  size: PropTypes.string,
};
