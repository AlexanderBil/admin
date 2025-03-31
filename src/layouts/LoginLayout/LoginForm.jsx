import React from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleChange,
  isSubmitting,
  values,
  errors,
  touched
}) => (
  <>
    <Typography variant="h5">
      Log in
    </Typography>
    <Typography variant="p" fontSize={'14px'} color={'text.secondary'}>
      Use your 1worldonline account
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField 
        margin="normal"
        fullWidth
        id="username"
        value={values.username}
        onChange={handleChange}
        error={touched.username && Boolean(errors.username)}
        helperText={touched.username && errors.username}
        label="Email or username"
        name="username"
        autoComplete="username"
      />
      <TextField 
        margin="normal"
        fullWidth
        id="password"
        value={values.password}
        onChange={handleChange}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" disabled={isSubmitting} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {isSubmitting && <CircularProgress size={20} sx={{ mr: 2 }} />}
        Log In
      </Button>
    </Box>
  </>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  isSubmitting: PropTypes.bool,
  values      : PropTypes.object,
  errors      : PropTypes.object,
  touched     : PropTypes.object
}

export default LoginForm;
