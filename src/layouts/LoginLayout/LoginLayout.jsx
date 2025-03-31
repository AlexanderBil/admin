import React from 'react';
import { Box, Container } from '@mui/material';
import LoginContainer from './LoginContainer';

const styles = {
  centeredContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  guestBox: {
    maxWidth: '400px',
    boxShadow: 3,
    padding: '16px'
  }
}

const LoginLayout = () => (
  <Container component="main" sx={styles.centeredContainer}>
    <Box sx={styles.guestBox}>
      <LoginContainer />
    </Box>
  </Container>
);

export default LoginLayout;