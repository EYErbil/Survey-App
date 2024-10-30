import React, { useState } from 'react';
import axios from '../AxiosConfig';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RegisterPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const adminCredentials = { username, password, email };

        axios.post('/auth/register', adminCredentials)
            .then(response => {
                const { token, userName, userId } = response.data;
                localStorage.setItem('token', token);
                onLogin(userName, userId);
                navigate('/');
            })
            .catch(() => {
                setError('Invalid username or password');
            });
    };

    return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Create Your Survey System Account</Typography>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 2, width: '100%' }} // Adjust margin bottom and width
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2, width: '100%' }} // Adjust margin bottom and width
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
              sx={{ mb: 2, width: '100%' }} // Adjust margin bottom and width
            />
            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
              Register
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>Already have an account? <a href="/login">Login</a></Typography>
            </Box>
          </form>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
      );
};

export default RegisterPage;
