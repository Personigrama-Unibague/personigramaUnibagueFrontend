import { createTheme } from '@material-ui/core/styles'
import { colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      light: '#5c5c5c',
      main: '#333333',
      dark: '#0c0c0c',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffea70',
      main: '#ddb83f',
      dark: '#a88800',
      contrastText: '#000000',
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
    }
  },
  shadows,
  typography
});

export default theme;
