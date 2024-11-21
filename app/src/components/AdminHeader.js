import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Grid, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AdminHeader(props) {
    const { onDrawerToggle, currentView, currentSubView, onSubViewChange } = props;

    const appBarColor = "#102C57";  // Dark blue for the AppBar

    const getTabs = () => {
        switch (currentView) {
            case 'users':
                return (
                    <Tabs value={currentSubView} onChange={onSubViewChange} textColor="inherit" indicatorColor="secondary">
                        <Tab label="Użytkownicy" value="viewUsers" />
                        <Tab label="Dodaj użytkownika" value="addUser" />
                    </Tabs>
                );
            case 'products':
                return (
                    <Tabs value={currentSubView} onChange={onSubViewChange} textColor="inherit" indicatorColor="secondary">
                        <Tab label="Produkty" value="viewProducts" />
                        <Tab label="Dodaj produkt" value="addProduct" />
                    </Tabs>
                );
            case 'orders':
                return (
                    <Tabs value={currentSubView} onChange={onSubViewChange} textColor="inherit" indicatorColor="secondary">
                        <Tab label="Zamówienia" value="viewOrders" />
                    </Tabs>
                );
            default:
                return null;
        }
    };

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0} sx={{ backgroundColor: appBarColor }}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                                sx={{ color: "#FEFAF6" }}  // Setting the color of the icon to off-white
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5, color: "#FEFAF6" }}>
                                <AccountCircleIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0, backgroundColor: "#EADBC8" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: "#102C57" }}>
                        {getTabs()}
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

AdminHeader.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
    currentView: PropTypes.string.isRequired,
    currentSubView: PropTypes.string.isRequired,
    onSubViewChange: PropTypes.func.isRequired,
};

export default AdminHeader;
