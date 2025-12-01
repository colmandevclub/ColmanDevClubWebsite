import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#F6C927' },
    secondary: { main: '#0A0A1B' },
    common: { border: '#1F1F53', background: '#0A0A1B' },
    text: { primary: '#fff' },
    divider: '#1F1F53',
    background: {
      default: '#0A0A1B',
      paper: '#0A0A1B',
    },
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          ':hover': {
            borderRadius: 10,
            transition: '0.5s',
            background: '#F6C927',
            boxShadow: '20px 20px 70px #1F1F53',
          },
          '&$selected': {
            background: '#1f1f5360',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#fff',
          fontWeight: '900',
          letterSpacing: '1px',
          textShadow: '1px 1px 2px #1F1F53',
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#0A0A1B',
          borderRadius: '10px',
          border: '1px solid #1F1F53',
          padding: '.5rem',
        },
      },
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            background: '#0e0e27',
          },
        },
        {
          props: { variant: 'light' },
          style: {
            background: '#0E0E27',
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: '900',
          fontSize: '1.25rem',
          padding: '0.25rem ',
          '&:hover': {
            boxShadow: '20px 20px 70px #1F1F53',
            background: '#F6C927',
            color:'#000000'
          },
        },
        disabled: {},
        sizeLarge: {
          height: '3.5rem',
        },
        sizeMedium: {
          padding: '0.5rem 1rem',
        },
        sizeSmall: {
          padding: '0.25rem 0.5rem',
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            background: '#0A0A1B',
            color: '#fff',
            borderColor: '#1F1F53',
            fontSize: 16,
            fontWeight: 200,
            textTransform: 'none',
            padding: '0.5rem 2rem',
            '&:hover': {
              background: '#1F1F53',
              borderColor: '#1F1F53',
            },
          },
        },
        {
          props: { variant: 'navlink' },
          style: {
            textTransform: 'none',
            fontSize: 18,
            '&:hover': {
              color: '#fff !important',
            },
          },
        },
        {
          props: { variant: 'navlink-secondary' },
          style: {
            border: '1px solid #F6C927',
            color: '#F6C927 !important',
            textTransform: 'none',
            fontSize: 18,
            '&:hover': {
              color: '#fff !important',
              background: '#F6C927',
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          borderColor: '#1F1F53',
          background: '#0A0A1B',
          color: '#fff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          border: '1px solid #1f1f53',
        },
      },
    },
    // MuiContainer: {
    //   styleOverrides: {
    //     root: {
    //       '@media (min-width: 1200px)': {
    //         maxWidth: '90%',
    //       },
    //     },
    //   },
    // },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          background: '#0A0A1B',
          color: '#fff',
        },
        iconOutlined: {
          color: '#fff',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        notchedOutline: {
          borderColor: '#1F1F53',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 2,
          border: '1px solid #1F1F53',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        divider: {},
        root: {
          '&:hover': {
            background: '#1f1f5360',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: 'solid #fff',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: '#0A0A1B',
          border: '1px solid #1F1F53',
        },
      },
      variants: [
        {
          props: { variant: 'squared' },
          style: {
            borderRadius: 8,
          },
        },
      ],
    },
  },
});
