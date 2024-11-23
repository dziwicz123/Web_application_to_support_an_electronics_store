import React from 'react';
import { Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';

const HighlightedListItem = styled(ListItem)(({ theme, active }) => ({
    borderLeft: active ? '4px solid #102C57' : 'none', // Updated to use #102C57
}));

const UserSidebar = ({ activeSection, setActiveSection, onLogout }) => (
    <Paper style={{ height: '25vh', padding: '20px', backgroundColor: '#EADBC8' }}>
        <List>
            <HighlightedListItem
                button
                active={activeSection === 'orders'}
                onClick={() => setActiveSection('orders')}
            >
                <ListItemText primary="Zamówienia" />
            </HighlightedListItem>
            <Divider />
            <HighlightedListItem
                button
                active={activeSection === 'comments'}
                onClick={() => setActiveSection('comments')}
            >
                <ListItemText primary="Komentarze" />
            </HighlightedListItem>
            <Divider />
            <HighlightedListItem button onClick={onLogout}>
                <ListItemText primary="Wyloguj" />
            </HighlightedListItem>
        </List>
    </Paper>
);

export default UserSidebar;
