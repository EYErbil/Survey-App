// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import logo from '../assets/logo.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';

const Logo = styled('img')({
  height: '50px',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.reload();
  window.location.href = '/';
}

const Header = ({ username, isAdmin }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="Company Logo" onClick={() => navigate('/')} />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          {username ? (
            <>
              <Typography variant="body1" sx={{ ml: 2 }}>Welcome, {username}!</Typography>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/create-survey">
                  Create Survey
                </Button>
              )}
              {isAdmin && (
                <Button color="inherit" component={Link} to="/user-surveys">
                  My Surveys
                </Button>
              )}
              <IconButton color="inherit"  onClick={handleLogout} >
                <ExitToAppIcon />
              </IconButton>

            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
