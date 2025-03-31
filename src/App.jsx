import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import axiosDefaultConfig from 'utils/axiosDefaultConfig';
import LoginLayout from 'layouts/LoginLayout';
import AdminLayout from 'layouts/AdminLayout';
import AuthCheck from 'components/AuthCheck';
import RedirectByRole from 'components/RedirectByRole';
import RoleCheck from 'components/RoleCheck';
import ParticipantsLayout from 'layouts/ParticipantsLayout';
import StatisticsLayout from 'layouts/StatisticsLayout';
import AccessRequestLayout from 'layouts/AccessRequestLayout';
import InvitationLayout from 'layouts/InvitationLayout';
import SendFundsLayout from 'layouts/SendFundsLayout';
import UsersSubmitionLayout from 'layouts/UsersSubmitionLayout';
import NftSponsorshipLayout from 'layouts/NftSponsorshipLayout';
import HomePageSetupLayout from 'layouts/HomePageSetupLayout';
import ContentLayout from 'layouts/ContentLayout';
import ContentDetailsLayout from 'layouts/ContentDetailsLayout';
import ImportContentLayout from 'layouts/ImportContentLayout';
import MyProfileLayout from 'layouts/MyProfileLayout';
import DeploymentRequestLayout from 'layouts/DeploymentRequestLayout';
import FiatPaymentsLayout from 'layouts/FiatPaymentsLayout';
import { theme } from './styles/styles';
import { ThemeProvider } from '@mui/material';

axiosDefaultConfig();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Routes>
          <Route element={<AuthCheck />}>
            <Route path='' element={<RedirectByRole />} />
            <Route path='login' element={<LoginLayout />} />
            <Route path='admin' element={<AdminLayout />}>
              <Route path={'profile'} element={<MyProfileLayout />} />
              <Route path={'statistics'} element={<StatisticsLayout />} />
              <Route path={'participants'} element={<ParticipantsLayout />} />
              <Route path={'content'} element={<ContentLayout />} />
              <Route path={'content/:id'} element={<ContentDetailsLayout />} />
              <Route
                path={'import-content'}
                element={<ImportContentLayout />}
              />
              <Route element={<RoleCheck role='super_admin' />}>
                <Route
                  path={'access-request'}
                  element={<AccessRequestLayout />}
                />
                <Route
                  path={'deployment-requests'}
                  element={<DeploymentRequestLayout />}
                />
                <Route path={'invitations'} element={<InvitationLayout />} />
                <Route path={'send-funds'} element={<SendFundsLayout />} />
                <Route
                  path={'user-submissions'}
                  element={<UsersSubmitionLayout />}
                />
                <Route
                  path={'nft-sponsorship'}
                  element={<NftSponsorshipLayout />}
                />
                <Route
                  path={'payments'}
                  element={<FiatPaymentsLayout />}
                />
                <Route
                  path={'home-page-setup'}
                  element={<HomePageSetupLayout />}
                />
              </Route>
            </Route>
            <Route path='*' element={<Navigate to='' replace />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
