import * as React from 'react';

import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import css from './style.module.css';
import { auth } from '../../config/firebase-config';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'The Team', path: '/team' },
  { title: 'Join Us', path: '/signup' },
  
  // { title: "Signin", path: "/signin" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="sticky" color="secondary" sx={{ borderBottom: '1px solid #1F1F53' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                height: 25,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                display: { xs: 'none', md: 'flex' },
                marginRight: 1,
              }}
              alt="The house from the offer."
              src="LogoBig-WhiteNoTextSmall.png"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Colman<span className={css['text-yellow']}>Dev</span>Club
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
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
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) =>
                  (page.title === 'Signin' || page.path === '/Signup') && localStorage.getItem('userToken') ? null : (
                    <NavLink
                      key={page.title}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                      to={page.path}
                    >
                      <MenuItem key={page} onClick={handleCloseNavMenu} divider>
                        <Typography textAlign="center">{page.title}</Typography>
                      </MenuItem>
                    </NavLink>
                  )
                )}

                {localStorage.getItem('userToken') && (
                  <NavLink
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    to="/syllabus"
                  >
                    <MenuItem key="syllabus" onClick={handleCloseNavMenu} divider>
                      <Typography textAlign="center">Syllabus</Typography>
                    </MenuItem>
                  </NavLink>
                )}
                {localStorage.getItem('userToken') && (
                  <NavLink
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    onClick={() => {
                      localStorage.removeItem('userToken');
                    }}
                    to="/signin"
                  >
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        handleCloseNavMenu();
                        localStorage.removeItem('userToken');
                        auth.signOut();
                      }}
                      divider
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </NavLink>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Colman<span className={css['text-yellow']}>Dev</span>Club
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {pages.map((page) =>
                (page.title === 'Signin' || page.path === '/Signup') && localStorage.getItem('userToken') ? null : (
                  <NavLink key={page.title} style={{ textDecoration: 'none', color: 'white' }} to={page.path}>
                    <Button
                      key={page.title}
                      onClick={handleCloseNavMenu}
                      sx={{
                        marginLeft: '0.25rem',
                        my: 2,
                        color: 'white',
                        display: 'block',
                        textTransform: 'none',
                      }}
                      className={page.path === pathname ? css['text-yellow'] : ''}
                    >
                      {page.title}
                    </Button>
                  </NavLink>
                )
              )}
              {localStorage.getItem('userToken') && (
                <NavLink key={'syllabus'} style={{ textDecoration: 'none', color: 'white' }} to={'/syllabus'}>
                  <Button
                    key={'syllabus'}
                    onClick={handleCloseNavMenu}
                    sx={{
                      marginLeft: '0.25rem',
                      my: 2,
                      color: 'white',
                      display: 'block',
                      textTransform: 'none',
                    }}
                  >
                    Syllabus
                  </Button>
                </NavLink>
              )}
              {localStorage.getItem('userToken') && (
                <NavLink key={'logout'} style={{ textDecoration: 'none', color: 'white' }} to={'/signin'}>
                  <Button
                    key={'logout'}
                    onClick={() => {
                      handleCloseNavMenu();
                      localStorage.removeItem('userToken');
                      auth.signOut();
                    }}
                    sx={{
                      marginLeft: '0.25rem',
                      my: 2,
                      color: 'white',
                      display: 'block',
                      textTransform: 'none',
                    }}
                  >
                    Logout
                  </Button>
                </NavLink>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>{<Outlet />}</main>
    </>
  );
};
export default Navbar;
