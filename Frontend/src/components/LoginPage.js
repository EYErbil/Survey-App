import React, { useState } from 'react';
import axios from '../AxiosConfig';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LoginPage = ({ onLogin }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminCredentials = { userName, password };

    axios.post('/auth/authenticate', adminCredentials)
      .then(response => {
        const { token, userName, userId } = response.data;
        localStorage.setItem('token', token);
        onLogin(userName,  userId);
        navigate('/');
      })
      .catch(() => {
        setError('Invalid username or password');
      });
  };

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Admin Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default LoginPage;
