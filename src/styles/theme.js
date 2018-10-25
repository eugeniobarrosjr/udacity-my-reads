import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5f7481',
      main: '#344955',
      dark: '#0b222c',
    },
    secondary: {
      light: '#ffdc65',
      main: '#f9aa33',
      dark: '#c17b00',
    },
    text: {
      header: '#17262A',
    },
    background: {
      default: '#e1e2e1',
    },
  },
  typography: {
    fontFamily: "'Work Sans', 'Roboto'",
    h6: {
      lineHeight: 1.2,
      fontSize: '1.1rem',
      fontWeight: 600,
    },
  },
});

export default theme;
