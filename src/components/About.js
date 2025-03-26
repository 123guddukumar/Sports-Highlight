import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, styled, AppBar, Toolbar, Button, Avatar, Grid, IconButton } from '@mui/material';
import { Instagram, Twitter, Facebook } from '@mui/icons-material';

// Styled Components
const Navbar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(26, 26, 26, 0.95)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
    padding: theme.spacing(1),
    position: 'sticky',
    top: 0,
    zIndex: 1100,
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1, 3),
    borderRadius: '25px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease, transform 0.3s ease',
    '&:hover': {
        background: '#ff6200',
        transform: 'scale(1.1)',
    },
}));

const HeroSection = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(https://www.transfermarkt.co.uk/betting/wp-content/uploads/sites/8/2024/10/Fussballstadion.jpg)', // Cricket-themed image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(255, 98, 0, 0.3))',
        zIndex: 1,
    },
    '& > *': {
        position: 'relative',
        zIndex: 2,
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: theme.spacing(4),
    backdropFilter: 'blur(5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
}));

const Footer = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%)',
    color: '#fff',
    padding: theme.spacing(6),
    textAlign: 'center',
    boxShadow: '0 -6px 25px rgba(0, 0, 0, 0.4)',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: '#fff',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
}));

const About = () => {
    return (
        <Box sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #ff6200 100%)', minHeight: '100vh' }}>
            {/* Navbar */}
            <Navbar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <motion.img
                            src="https://etimg.etb2bimg.com/photo/74508790.cms"
                            alt="IPL Logo"
                            style={{ height: 40, marginRight: 16 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                        <Typography variant="h6" sx={{ color: '#ff6200', fontWeight: 'bold' }}>
                            IPL Highlights Hub
                        </Typography>
                    </Box>
                    <Box>
                        <NavButton component={Link} to="/">Home</NavButton>
                        <NavButton component={Link} to="/about">About</NavButton>
                        <NavButton component={Link} to="/highlights">Highlights</NavButton>
                    </Box>
                </Toolbar>
            </Navbar>

            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        <StyledTypography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 'bold' }}>
                            About Us
                        </StyledTypography>
                    </motion.div>
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                        <StyledTypography variant="h5">
                            Your ultimate destination for IPL excitement!
                        </StyledTypography>
                    </motion.div>
                </Container>
            </HeroSection>

            {/* Content */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <ContentBox sx={{ mb: 6 }}>
                    <Typography variant="h4" sx={{ color: '#ff6200', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
                        IPL Highlights Hub is dedicated to bringing you the most thrilling moments from the Indian Premier League. Whether it’s breathtaking sixes, stunning catches, or game-changing wickets, we’ve got it all in one place. Our goal is to keep the IPL spirit alive for fans worldwide with high-quality highlights and an immersive experience.
                    </Typography>
                </ContentBox>

                <ContentBox>
                    <Typography variant="h4" sx={{ color: '#ff6200', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
                        Meet the Developer
                    </Typography>
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={4}>
                            <Avatar
                                src="https://avatars.githubusercontent.com/u/12345678?v=4" // Replace with your GitHub/avatar URL
                                alt="Developer"
                                sx={{ width: 150, height: 150, mx: 'auto', boxShadow: '0 8px 20px rgba(255, 98, 0, 0.3)' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                Divyansu Verma
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff', mt: 1 }}>
                                I’m a passionate developer and cricket enthusiast who built IPL Highlights Hub to share the excitement of IPL with fans everywhere. With expertise in React, Node.js, and cloud technologies, I’ve crafted this platform to deliver a seamless and engaging experience. Let’s celebrate cricket together!
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <IconButton sx={{ color: '#ff6200' }} href="https://github.com/123guddukumar" target="_blank">
                                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={{ width: 24 }} />
                                </IconButton>
                                <IconButton sx={{ color: '#ff6200' }} href="https://linkedin.com/in/123guddukumar" target="_blank">
                                    <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" alt="LinkedIn" style={{ width: 24 }} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </ContentBox>
            </Container>

            {/* Footer */}
            <Footer>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                    IPL Highlights Hub
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
                    <IconButton sx={{ color: '#ff6200' }} href="https://instagram.com" target="_blank"><Instagram /></IconButton>
                    <IconButton sx={{ color: '#ff6200' }} href="https://twitter.com" target="_blank"><Twitter /></IconButton>
                    <IconButton sx={{ color: '#ff6200' }} href="https://facebook.com" target="_blank"><Facebook /></IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
                    <Button color="inherit" component={Link} to="/" sx={{ color: '#ff6200', fontWeight: 'bold' }}>Home</Button>
                    <Button color="inherit" component={Link} to="/about" sx={{ color: '#ff6200', fontWeight: 'bold' }}>About</Button>
                    <Button color="inherit" component={Link} to="/highlights" sx={{ color: '#ff6200', fontWeight: 'bold' }}>Highlights</Button>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    © {new Date().getFullYear()} IPL Highlights Hub. All rights reserved.
                </Typography>
            </Footer>
        </Box>
    );
};

export default About;