import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActionArea, styled, AppBar, Toolbar, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Instagram, Twitter, Facebook } from '@mui/icons-material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    borderRadius: '20px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 40px rgba(255, 98, 0, 0.4)',
    },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: '#fff',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
}));

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
    backgroundImage: 'url(https://www.transfermarkt.co.uk/betting/wp-content/uploads/sites/8/2024/10/Fussballstadion.jpg)', // IPL stadium
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '70vh',
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

const SectionBox = styled(Box)(({ theme }) => ({
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

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://sports-highlight.onrender.com/api/videos');
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const playerVideos = videos.filter(video =>
        video.title.toLowerCase().includes('kohli') ||
        video.title.toLowerCase().includes('dhoni') ||
        video.title.toLowerCase().includes('rohit') ||
        video.title.toLowerCase().includes('gill')
    );

    const topVideos = videos
        .filter(video => !playerVideos.some(pv => pv._id === video._id))
        .slice(0, 4);

    const topPlayerVideos = playerVideos.slice(0, 4);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 70 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const handleCardClick = (video) => {
        setSelectedVideo(video);
    };

    const handleClose = () => {
        setSelectedVideo(null);
    };

    return (
        <Box sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #ff6200 100%)', minHeight: '100vh' }}>
            {/* Navbar */}
            <Navbar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <motion.img
                            src="https://etimg.etb2bimg.com/photo/74508790.cms" // IPL logo
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
                    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
                        <StyledTypography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 'bold' }}>
                            IPL Highlights Hub
                        </StyledTypography>
                    </motion.div>
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}>
                        <StyledTypography variant="h5" sx={{ mb: 4 }}>
                            Relive the Thrill of Every IPL Moment!
                        </StyledTypography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ background: '#ff6200', borderRadius: '25px', padding: '12px 30px', '&:hover': { background: '#e55a00' } }}
                            onClick={() => navigate('/highlights')}
                        >
                            Explore Highlights
                        </Button>
                    </motion.div>
                </Container>
            </HeroSection>

            {/* Content Sections */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                {/* Top 4 Videos */}
                <SectionBox sx={{ mb: 8 }}>
                    <StyledTypography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Top Highlights</StyledTypography>
                    {loading ? (
                        <StyledTypography>Loading videos...</StyledTypography>
                    ) : topVideos.length === 0 ? (
                        <StyledTypography>No videos available yet.</StyledTypography>
                    ) : (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <Grid container spacing={4}>
                                {topVideos.map((video) => (
                                    <Grid item xs={12} sm={6} md={3} key={video._id}>
                                        <motion.div variants={cardVariants}>
                                            <StyledCard>
                                                <CardActionArea onClick={() => handleCardClick(video)}>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        image={video.thumbnail}
                                                        alt={video.title}
                                                        sx={{ objectFit: 'cover' }}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="div" color="#ff6200" sx={{ fontWeight: 'bold' }}>
                                                            {video.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {video.description.substring(0, 50)}...
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </StyledCard>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </motion.div>
                    )}
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button
                            variant="outlined"
                            sx={{ color: '#ff6200', borderColor: '#ff6200', borderRadius: '25px', padding: '10px 25px', '&:hover': { background: '#ff6200', color: '#fff' } }}
                            onClick={() => navigate('/highlights')}
                        >
                            Show More
                        </Button>
                    </Box>
                </SectionBox>

                {/* Top Players Highlights */}
                <SectionBox sx={{ mb: 8 }}>
                    <StyledTypography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Top Players Highlights</StyledTypography>
                    {loading ? (
                        <StyledTypography>Loading videos...</StyledTypography>
                    ) : topPlayerVideos.length === 0 ? (
                        <StyledTypography>No player highlights available yet.</StyledTypography>
                    ) : (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <Grid container spacing={4}>
                                {topPlayerVideos.map((video) => (
                                    <Grid item xs={12} sm={6} md={3} key={video._id}>
                                        <motion.div variants={cardVariants}>
                                            <StyledCard>
                                                <CardActionArea onClick={() => handleCardClick(video)}>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        image={video.thumbnail}
                                                        alt={video.title}
                                                        sx={{ objectFit: 'cover' }}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="div" color="#ff6200" sx={{ fontWeight: 'bold' }}>
                                                            {video.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {video.description.substring(0, 50)}...
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </StyledCard>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </motion.div>
                    )}
                </SectionBox>
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
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                    Powered by Cloudinary & MongoDB Atlas
                </Typography>
            </Footer>

            {/* Video Playback Dialog */}
            <Dialog open={!!selectedVideo} onClose={handleClose} maxWidth="md" fullWidth>
                {selectedVideo && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <DialogTitle sx={{ background: '#ff6200', color: '#fff' }}>{selectedVideo.title}</DialogTitle>
                        <DialogContent sx={{ background: '#fff' }}>
                            <Box sx={{ mb: 2, mt: 2 }}>
                                <video width="100%" controls autoPlay>
                                    <source src={selectedVideo.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                            <Typography variant="body1">{selectedVideo.description}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Uploaded: {new Date(selectedVideo.createdAt).toLocaleDateString()}
                            </Typography>
                        </DialogContent>
                    </motion.div>
                )}
            </Dialog>
        </Box>
    );
};

export default Home;