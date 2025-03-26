import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const AdminLogin = ({ setIsAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const adminEmail = 'fakeclube256@gmail.com';
        const adminPass = 'Guddu123@';

        if (email === adminEmail && password === adminPass) {
            setIsAdmin(true);
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>Admin Login</Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, background: '#ff6200' }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AdminLogin;