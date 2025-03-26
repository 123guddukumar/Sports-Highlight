import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Highlights from './components/Highlights';
import About from './components/About'; // Add About
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#ff6200' },
    background: { default: '#f5f5f5' },
  },
});

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <AdminLogin setIsAdmin={setIsAdmin} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;