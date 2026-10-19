import { AppBar, Button, Toolbar } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { pages } from './defintions';
import LogoAndTitle from './LogoAndTitle';
import MobileNavbar from './MobileNavbar';
import NavbarProfile from './NavbarProfile';
import { UserAuth } from 'src/lib/auth/authContext';

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = UserAuth();

  return (
    <AppBar position="sticky" color="secondary" sx={{ borderBottom: '1px solid #1F1F53' }}>
      <Toolbar
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'space-between',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <LogoAndTitle />
          {pages.map((page) => (
            ((page?.requiredAuth && user) || (!page?.requiredAuth)) && <Button
              key={page.title}
              LinkComponent={NavLink}
              to={page.path}
              variant="navlink"
              sx={{ color: pathname === page.path ? 'primary.main' : 'inherit' }}
            >
              {page.title}
            </Button>
          ))}
        </Toolbar>
        {/* <Button onClick={() => setCurrentRouter(routers.management)}>Dashboard</Button> */}
        <NavbarProfile />
      </Toolbar>
      <MobileNavbar />
    </AppBar>
  );
};

export default Navbar;
