import React, { useState, useEffect } from "react";
import {
    AppBar,
    TextField,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Box,
    Container,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem
} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from 'axios';

const AppNavbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleProfileMenuOpen = (event) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenuAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        function handleScroll() {
            if (!mobileOpen && window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [mobileOpen]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
        handleClose();
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleUserButtonClick = () => {
        if (isLoggedIn) {
            navigate('/profile'); // Redirect to user profile page
        } else {
            navigate('/login'); // Redirect to login page
        }
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Kategorie
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem
                        button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <ListItemText primary={category.categoryName} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: "#2c3e50" }}>
                <Container>
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{
                                mr: 2,
                                display: showButton ? 'block' : 'none'
                            }}
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {categories.map((category) => (
                                <MenuItem
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                        >
                            <RouterLink
                                to="/"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <img
                                    src="/plus_kom_logo_light.svg"
                                    alt="Logo"
                                    style={{ maxHeight: "60px" }}
                                />
                            </RouterLink>
                        </Typography>
                        <Box
                            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
                        >
                            <TextField
                                variant="outlined"
                                placeholder="Czego szukasz?"
                                size="small"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                sx={{
                                    input: { color: "white" },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                    },
                                }}
                            />
                            <IconButton
                                sx={{ ml: 1, color: "white" }}
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Box>
                        <IconButton sx={{ color: "white" }} component={RouterLink} to="/cart">
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleUserButtonClick}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        {isLoggedIn && (
                            <Menu
                                anchorEl={profileMenuAnchorEl}
                                open={Boolean(profileMenuAnchorEl)}
                                onClose={handleProfileMenuClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <AppBar
                position="static"
                sx={{ backgroundColor: "grey", display: { xs: "none", sm: "block" } }}
            >
                <Toolbar variant="dense">
                    <Container>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    component={RouterLink}
                                    to={`/category/${category.id}`}
                                    sx={{ color: "white" }}
                                >
                                    {category.categoryName}
                                </Button>
                            ))}
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default AppNavbar;
