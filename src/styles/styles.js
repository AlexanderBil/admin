import { createTheme } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      mobileS: 0,
      mobileM: 375,
      mobileL: 425,
      tablet: 768,
      laptop: 1024,
      laptopL: 1440,
      desktop: 1920,
    },
  },
});
