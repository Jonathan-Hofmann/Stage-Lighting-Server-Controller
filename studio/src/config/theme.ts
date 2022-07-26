import { createTheme, ThemeOptions } from "@mui/material/styles";

export const muiThemeOptions: ThemeOptions = createTheme( {
  palette: {
    primary: {
      main: '#0057FF',
    },
    secondary: {
      main: '#f7fafc',
    },
    error: {
      main: '#f5365c',
    },
    warning: {
      main: '#fb6340',
    },
    success: {
      main: '#2DCE89',
    },
    info: {
      main: '#0057FF',
    },
    // divider: '#e9ecef',
    text: {
      secondary: '#8898aa',
      primary: '#212529',
      disabled: '#ced4da',
    },
  },
  typography: {
    h1: {
      fontSize: '2.7rem',
      fontFamily: 'Open Sans',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontFamily: 'Open Sans',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Open Sans',
      fontSize: '2.3rem',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'Open Sans',
      fontSize: '2rem',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Open Sans',
      fontWeight: 600,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Open Sans',
    },
    subtitle2: {
      fontFamily: 'Open Sans',
    },
    subtitle1: {
      fontFamily: 'Open Sans',
    },
    body2: {
      fontFamily: 'Open Sans',
    },
    button: {
      fontFamily: 'Open Sans',
    },
    caption: {
      fontFamily: 'Open Sans',
    },
    overline: {
      fontFamily: 'Open Sans',
    },
  },
  components:{
    MuiButtonBase: {
        styleOverrides: {
            root: {
                borderRadius: "6px",
                boxShadow: "none",
                fontWeight: "600",
                textTransform: "none"
            }
        }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform: 'none',
          borderRadius: '6px'
        }
      }
    },
    // MuiTextField:{
    //   styleOverrides:{
    //     root:{

    //     },
    //   }
    // },
    MuiChip:{
      styleOverrides: {
        root: {
        }
      }
    },
    MuiCard:{
      styleOverrides:{
        root:{
          borderRadius: "10px",
          marginBottom:'30px',
          padding: "10px",
        }
      }
    },
    MuiAlert:{
      styleOverrides:{
        root:{
          borderRadius: '10px',
          
        },
        standardWarning:{
          border: '1px solid #fb6340'
        }
      }
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          borderRadius: '10px',
        }
      }
    },
    MuiTextField:{
      styleOverrides:{
        root:{
          borderRadius: '6px',
          // borderColor: 'var(--lighter)',
          // border: '1px solid var(--lighter)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--lighter)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--lighter)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--primary)',
            },
          },
        },
      }
    },
    MuiOutlinedInput:{
      styleOverrides:{
        root:{
          borderRadius: '6px',
          
        },
      }
    }
  },
  zIndex:{
    snackbar:999999,
    tooltip: 999999
  },
  shadows: ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none","none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"],

});