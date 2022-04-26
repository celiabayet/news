import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#052528',
      light: '#1C4242',
      dark: '#052528',
    },
    secondary: {
      main: '#EDEDF1',
      dark: '#EDEDF1',
      light: '#EDEDF1'
    },
    infos: {
      main: '#80CCEA'
    }
  },
  typography: {
    fontFamily: 'IBM Plex Sans'
  }
});

theme.props = {
  MuiButton: {
    //disableElevation: true,
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiInput: {
    disableUnderline: true,
  },
  MuiTooltip: {
    arrow: true,
  },
};

theme.components = {
  //Typography
  MuiTypography: {
    styleOverrides: {
      h2: {
        color: theme.palette.secondary.main,
        fontWeight: 700,
        textAlign: 'center'
      },
      h3: {
        color: '#003D55',
        fontWeight: 600,
        textAlign: 'center'
      },
      h4: {
        color: theme.palette.secondary.light,
        textAlign: 'center',
        // fontSize: 'large'
      },
      h5: {
        color: theme.palette.primary.main,
        textAlign: 'center',
        fontWeight: 800,
        fontSize: 'large'
      },
      body1: {
        color: theme.palette.secondary.light,
        // textAlign: 'center',
        fontWeight: 900,
      },
      body2: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 900,
      },
    }
  },
  // Tabs
  MuiTab: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.secondary.light,
          topBorderRadius: '20px',
          fontWeight: 600,
        },
        color: theme.palette.primary.dark,
        topBorderRadius: '20px',
        fontWeight: 600,
      }
    }
  },
  // Buttons
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        textTransform: 'none',
        color: theme.palette.primary.dark,
        fontWeight: 700,
      },
      contained: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.dark,
        underline: 'none',
        borderRadius: '20px',
        fontWeight: 700,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.light,
        },
      },
      containedPrimary: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.main,
        underline: 'none',
        borderRadius: '20px',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.primary.light,
        },
      },
      containedSecondary: {
        fontWeight: 700,
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
        underline: 'none',
        borderRadius: '20px',
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.dark,
        },
      },
    }
  },
  // Links
  MuiLink: {
    styleOverrides: {
      root: {
        my: 2,
        display: 'block',
      },
      underlineNone: {
        fontWeight: '600',
        color: theme.palette.primary.dark,
        '&:hover': {
          color: theme.palette.secondary.main,
        }
      }

    }
  },
  // Cards
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: 'none',
        borderRadius: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: 'none',
        margin: 0
      }
    }
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        bottomBorderRadius: '20px',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: 'none',
        // backgroundImage: 'url(${"./light-blue.jpg"})',
        backgroundColor: 'none',
        // backgroundColor: theme.palette.primary.light,
        // color: theme.palette.secondary.light,
        fontWeight: 500
      }
    }
  },
  MuiCardMedia: {
    styleOverrides: {
      root: {
        // borderRadius: '20px',
        height: '40%',
      }
    }
  },
};

export default theme;