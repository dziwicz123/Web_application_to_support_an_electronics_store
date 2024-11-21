import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import InventoryIcon from '@mui/icons-material/Inventory';

const categories = [
  {
    id: 'Zarządzaj',
    children: [
      { id: 'Użytkownicy', icon: <PeopleIcon />, view: 'users' },
      { id: 'Zamówienia', icon: <DnsRoundedIcon />, view: 'orders' },
      { id: 'Produkty', icon: <InventoryIcon />, view: 'products' },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: '#102C57', // Dark blue text color for items
  '&:hover, &:focus': {
    bgcolor: '#DAC0A3', // Lighter tan color on hover
  },
};

const itemCategory = {
  boxShadow: 'none', // Remove existing border
  py: 1.5,
  px: 3,
  color: '#FEFAF6', // Off-white text color for category
  bgcolor: '#102C57', // Dark blue background for the category title
};
export default function Navigator(props) {
  const { onSelectView, ...other } = props;

  return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem
              sx={{
                ...item,
                ...itemCategory,
                fontSize: 22,
                minHeight: 64, // Ensure consistent height
              }}
          >
            TECHPOL
          </ListItem>
          {categories.map(({ id, children }) => (
              <Box key={id} sx={{ bgcolor: '#EADBC8' }}>
                <ListItem sx={{ py: 2, px: 3, color: '#102C57' }}>
                  <ListItemText>{id}</ListItemText>
                </ListItem>
                {/* Child Items */}
                {children.map(({ id: childId, icon, view }) => (
                    <ListItem disablePadding key={childId}>
                      <ListItemButton sx={item} onClick={() => onSelectView(view)}>
                        <ListItemIcon sx={{ color: '#102C57' }}>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                ))}
                {/* Divider */}
                <Divider sx={{ mt: 2, bgcolor: '#DAC0A3' }} />
              </Box>
          ))}
        </List>
      </Drawer>
  );
}
