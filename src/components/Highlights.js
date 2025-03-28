import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActionArea, styled, AppBar, Toolbar, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

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

const SectionBox = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: theme.spacing(4),
    backdropFilter: 'blur(5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
}));

const Highlights = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
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

            {/* Content */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <SectionBox>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}>
                        <StyledTypography variant="h3" sx={{ textAlign: 'center', mb: 6 }}>
                            All IPL Highlights
                        </StyledTypography>
                    </motion.div>

                    {loading ? (
                        <StyledTypography sx={{ textAlign: 'center' }}>Loading videos...</StyledTypography>
                    ) : videos.length === 0 ? (
                        <StyledTypography sx={{ textAlign: 'center' }}>No videos available yet.</StyledTypography>
                    ) : (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <Grid container spacing={4}>
                                {videos.map((video) => (
                                    <Grid item xs={12} sm={6} md={4} key={video._id}>
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

export default Highlights;