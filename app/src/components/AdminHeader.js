import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Grid,
    IconButton,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AdminHeader(props) {
    const { onDrawerToggle, currentView, currentSubView, onSubViewChange } = props;

    // Dodajemy obsługę menu dla ikony użytkownika
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Wylogowanie - usunięcie danych z sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('basket');
        navigate('/login');
    };

    const appBarColor = '#102C57'; // Dark blue for the AppBar

    const getTabs = () => {
        switch (currentView) {
            case 'users':
                return (
                    <Tabs
                        value={currentSubView}
                        onChange={onSubViewChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                        <Tab label="Użytkownicy" value="viewUsers" />
                        <Tab label="Dodaj użytkownika" value="addUser" />
                    </Tabs>
                );
            case 'products':
                return (
                    <Tabs
                        value={currentSubView}
                        onChange={onSubViewChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                        <Tab label="Produkty" value="viewProducts" />
                        <Tab label="Dodaj produkt" value="addProduct" />
                    </Tabs>
                );
            case 'orders':
                return (
                    <Tabs
                        value={currentSubView}
                        onChange={onSubViewChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                        <Tab label="Zamówienia" value="viewOrders" />
                    </Tabs>
                );
            default:
                return null;
        }
    };

    return (
        <React.Fragment>
            {/* Górny AppBar z przyciskiem otwierania menu (po lewej) i ikoną użytkownika (po prawej) */}
            <AppBar
                color="primary"
                position="sticky"
                elevation={0}
                sx={{ backgroundColor: appBarColor }}
            >
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        {/* Hamburger do otwierania / zamykania menu bocznego, widoczny tylko na małych ekranach */}
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                                sx={{ color: '#FEFAF6' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        {/* Ikona użytkownika + Menu */}
                        <Grid item>
                            <IconButton
                                color="inherit"
                                sx={{ p: 0.5, color: '#FEFAF6' }}
                                onClick={handleMenuOpen}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Dolny AppBar z zakładkami do podstron (Użytkownicy, Produkty, Zamówienia, itd.) */}
            <AppBar
                component="div"
                position="static"
                elevation={0}
                sx={{ zIndex: 0, backgroundColor: '#EADBC8' }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#102C57' }}>
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
