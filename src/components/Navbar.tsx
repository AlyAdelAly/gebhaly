import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const NavBar = () => {

  const { cartQuantity, openCart } = useCart();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className='custom-font'>
            <Link href={'/Products'}>
              Gebhaly Store
            </Link>
          </Typography>
          <Button color="inherit" size='large' onClick={openCart}>
            <ShoppingCartIcon />
            <div
              className={cartQuantity > 0 ? "rounded-full bg-red-500 text-white w-6 h-6 absolute bottom-0 right-0" : ""}
            >
              {cartQuantity > 0 ? cartQuantity : ''}
            </div>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default NavBar;