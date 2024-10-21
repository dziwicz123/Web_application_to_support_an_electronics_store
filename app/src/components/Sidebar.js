import React from 'react';
import { Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderLeft: active ? '4px solid black' : 'none',
}));

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => (
    <Paper style={{ height: '50vh', padding: '16px', backgroundColor: '#F5F5F5' }}>
      <List>
        <StyledListItem
            button
            active={activeSection === 'orders'}
            onClick={() => setActiveSection('orders')}
        >
          <ListItemText primary="Zamówienia" />
        </StyledListItem>
        <Divider />
        <StyledListItem
            button
            onClick={onLogout}
        >
          <ListItemText primary="Wyloguj" />
        </StyledListItem>
      </List>
    </Paper>
);

export default Sidebar;
