import React from 'react';
import {
  Grid,
  CardMedia,
  Typography,
  IconButton,
  Input,
  Divider,
} from '@mui/material';
import { Add, Remove, Close } from '@mui/icons-material';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
      <React.Fragment>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item md={2}>
            <CardMedia
                component="img"
                image={item.image}
                alt={item.productName}
                sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
            />
          </Grid>
          <Grid item md={4}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {item.category.categoryName}
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', mb: 0 }}>
              {item.productName}
            </Typography>
          </Grid>
          <Grid item md={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => handleQuantityChange(-1)}>
              <Remove />
            </IconButton>
            <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) - item.quantity)}
                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                sx={{ mx: 1, width: '60px' }}
            />
            <IconButton onClick={() => handleQuantityChange(1)}>
              <Add />
            </IconButton>
          </Grid>
          <Grid item md={2} sx={{ textAlign: 'end' }}>
            <Typography variant="h6">{item.price.toFixed(2)} zł</Typography>
          </Grid>
          <Grid item md={1} sx={{ textAlign: 'end' }}>
            <IconButton onClick={() => onRemove(item.id)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
      </React.Fragment>
  );
}
