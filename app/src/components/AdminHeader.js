import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header(props) {
  const { onDrawerToggle, currentView, currentSubView, onSubViewChange } = props;

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'users':
        return 'Użytkownicy';
      case 'products':
        return 'Produkty';
      case 'orders':
        return 'Zamówienia';
      default:
        return 'Użytkownicy';
    }
  };

  const getTabs = () => {
    switch (currentView) {
      case 'users':
        return (
          <Tabs value={currentSubView} onChange={onSubViewChange} textColor="inherit">
            <Tab label="Użytkownicy" value="viewUsers" />
            <Tab label="Dodaj użytkownika" value="addUser" />
          </Tabs>
        );
      case 'products':
        return (
          <Tabs value={currentSubView} onChange={onSubViewChange} textColor="inherit">
            <Tab label="Produkty" value="viewProducts" />
            <Tab label="Dodaj produkt" value="addProduct" />
          </Tabs>
        );
      case 'orders':
        return (
          <Tabs value={currentSubView} onChange={onSubViewChange} textColor="inherit">
            <Tab label="Zamówienia" value="viewOrders" />
          </Tabs>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <AccountCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {getHeaderTitle()}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        {getTabs()}
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  currentSubView: PropTypes.string.isRequired,
  onSubViewChange: PropTypes.func.isRequired,
};

export default Header;
