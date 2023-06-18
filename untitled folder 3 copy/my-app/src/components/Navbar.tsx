import React, {useState} from 'react';
import { AppBar, Toolbar, Box, IconButton, Badge, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Cart from '../pages/Cart';
import './Navbar.css'

interface NavbarProps {
  cartItems: any[];
}

const Navbar: React.FC<NavbarProps> = ({ cartItems }) => {
  const[open, setOpen] = useState(false)
  const itemCount = cartItems.length;

  return (
    <AppBar position="sticky" color="transparent"  style={{ backdropFilter: 'saturate(180%) blur(15px)'}}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="h1" color="inherit" noWrap>
            Eshop
          </Typography>
        </Link>
        <Box display="flex" alignItems="center" flexGrow={1} justifyContent="flex-end">
          <Box mx={2}>
            <Link to="/registration" style={{ textDecoration: 'none', color: '#fff' }}>
              <Typography className="navbarItem"variant="body1" component="p">
                User
              </Typography>
            </Link>
          </Box>
          <Box mx={2}>
            <Link to="/allproducts" style={{ textDecoration: 'none', color: '#fff' }}>
              <Typography className="navbarItem"variant="body1" component="p">
                Shop All
              </Typography>
            </Link>
          </Box>
          <Box mx={2}>
            {/* <Link to="/cart" style={{ textDecoration: 'none', color: '#fff' }}> */}
              <IconButton onClick={()=>setOpen(!open)} edge="end" aria-label="shopping-cart">
                <Badge badgeContent={itemCount} color="error">
                  <ShoppingCart style={{ color: '#fff' }} />
                </Badge>
              </IconButton>
            {/* </Link> */}
          </Box>
        </Box>
      </Toolbar>
      {open && <Cart cartItems={[]}/>}
    </AppBar>
  );
};

export default Navbar;
