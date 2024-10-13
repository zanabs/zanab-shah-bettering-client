import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Button, TextField, Menu, MenuItem, Container, Divider, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './Header.scss';
import { Link } from 'react-router-dom';

const pages = ['Contact'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <AppBar position="static" color="transparent" sx={{ backgroundColor: '#CFF7D3', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to="/">
            <Box
              component="img"
              alt="Block"
              src="/assets/b.png"
              sx={{ flex: '0 0 auto', width: '40px' }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <a href="https://www.linkedin.com/in/zanab-jafry-shah/" target='_blank' key={page}>
                    <Typography textAlign="center" variant="body1" color='black'>{page}</Typography>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page}>
                <a href="https://www.linkedin.com/in/zanab-jafry-shah/" target='_blank'>
                  <Typography textAlign="center" variant="body1" color='black'>{page}</Typography>
                </a>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>

            {!showSearchBar ? (
              <IconButton onClick={toggleSearchBar} color="inherit">
                <SearchIcon />
              </IconButton>
            ) : (
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                autoFocus
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  width: '200px',
                }}
                onBlur={toggleSearchBar}
              />
            )}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: '30px', alignSelf: 'center', backgroundColor: 'black' }}
            />

            <Link to="/login">
            <Typography
              variant="body1"
              sx={{
                color: '#000',
                cursor: 'pointer',
              }}
            >
              Login
            </Typography>
            </Link>
              <Link to="/demo">
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                backgroundColor: '#2E8B57',
              }}
            >
              Demo
            </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;


