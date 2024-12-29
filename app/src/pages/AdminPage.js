import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from '../components/AdminNavigator';
import Header from '../components/AdminHeader';
import Users from '../components/Users';
import AddUser from '../components/AddUser';
import Products from '../components/Products';
import AddProduct from '../components/AddProduct';
import Orders from '../components/Orders';

function Copyright() {
  return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          + Kom
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
  );
}

// Define the theme using a single createTheme call
const theme = createTheme({
  palette: {
    primary: {
      light: '#DAC0A3',
      main: '#EADBC8',
      dark: '#FEFAF6',
    },
    background: {
      default: '#FEFAF6',
      paper: '#EADBC8',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
      color: '#102C57',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          minHeight: 64, // Standard height for all app bars
          backgroundColor: '#DAC0A3', // Light tan
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#EADBC8', // Light tan background
          border: 'none', // Remove border
          boxShadow: 'none', // Remove box shadow
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          // Use a function to access the theme's spacing
          marginLeft: ({ theme }) => theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: '#FFFFFF', // White indicator
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          // Responsive styling using MUI's breakpoints
          '@media (min-width:600px)': {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: ({ theme }) => theme.spacing(1), // 8px padding
          color: '#FEFAF6', // Off-white color
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          border: 'none', // Remove the default border
          height: '1px', // Set height if you want a visible line
          backgroundColor: '#EADBC8', // Custom divider color
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7', // Selected color
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: ({ theme }) => theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: ({ theme }) => theme.spacing(2), // 16px margin
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 64, // Uniform toolbar height
    },
  },
});

const drawerWidth = 256;

export default function AdminPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [selectedView, setSelectedView] = useState('users');
  const [selectedSubView, setSelectedSubView] = useState('viewUsers');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubViewChange = (event, newValue) => {
    setSelectedSubView(newValue);
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'users':
        switch (selectedSubView) {
          case 'viewUsers':
            return <Users />;
          case 'addUser':
            return <AddUser />;
          default:
            return <Users />;
        }
      case 'products':
        switch (selectedSubView) {
          case 'viewProducts':
            return <Products />;
          case 'addProduct':
            return <AddProduct />;
          default:
            return <Products />;
        }
      case 'orders':
        switch (selectedSubView) {
          case 'viewOrders':
            return <Orders />;
          default:
            return <Orders />;
        }
      default:
        return <Users />;
    }
  };

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isSmUp ? null : (
                <Navigator
                    PaperProps={{ style: { width: drawerWidth } }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    onSelectView={(view) => {
                      setSelectedView(view);
                      setSelectedSubView(`view${view.charAt(0).toUpperCase() + view.slice(1)}`);
                    }}
                />
            )}

            <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                sx={{ display: { sm: 'block', xs: 'none' } }}
                onSelectView={(view) => {
                  setSelectedView(view);
                  setSelectedSubView(`view${view.charAt(0).toUpperCase() + view.slice(1)}`);
                }}
            />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header
                onDrawerToggle={handleDrawerToggle}
                currentView={selectedView}
                currentSubView={selectedSubView}
                onSubViewChange={handleSubViewChange}
            />
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#DAC0A3' }}>
              {renderContent()}
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: '#DAC0A3' }}>
              <Copyright />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
  );
}
