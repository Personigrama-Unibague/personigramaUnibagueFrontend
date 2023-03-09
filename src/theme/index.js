import { createTheme } from '@material-ui/core/styles'
import { colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: '##193F76',
      paper: colors.common.white
    },
    primary: {
      light: '#193F76',
      main: '#193F76',
      dark: '#193F76',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#1B5DA7',
      main: '#1B5DA7',
      dark: '#1B5DA7',
      contrastText: '#000000',
    },
    tertiary: {
      light: '#0F1F39',
      main: '#0F1F39',
      dark: '#0F1F39',
      contrastText: '#000000',
    },
    dropdowns: {
      light: '#02AFD8',
      main: '#039EC2',
      dark: '#017A97',
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
