import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Typography, Box, LinearProgress, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const AdminDashboard = () => {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videos, setVideos] = useState([]);
    const [editVideo, setEditVideo] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/videos');
            setVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleVideoUpload = async (e) => {
        e.preventDefault();
        if (!video || !title || !description) {
            setMessage('Please fill all fields and select a video');
            return;
        }

        const formData = new FormData();
        formData.append('file', video);
        formData.append('upload_preset', 'ipl_highlights');
        formData.append('public_id', `${title}-${Date.now()}`);
        formData.append('resource_type', 'video');

        try {
            setMessage('Uploading to Cloudinary...');
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/ddbyqg5d0/video/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percent);
                    },
                }
            );

            const uploadedUrl = response.data.secure_url;
            setVideoUrl(uploadedUrl);

            await axios.post('http://localhost:5000/api/videos', {
                title,
                description,
                videoUrl: uploadedUrl,
                thumbnail: uploadedUrl.replace('.mp4', '.jpg'),
            });

            setMessage('Video uploaded successfully!');
            setVideo(null);
            setTitle('');
            setDescription('');
            setProgress(0);
            fetchVideos();
        } catch (error) {
            setMessage(`Upload failed: ${error.response?.data?.error?.message || error.message}`);
        }
    };

    const handleEdit = (video) => {
        setEditVideo(video);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editVideo.title || !editVideo.description) {
            setMessage('Please fill all fields');
            return;
        }
        try {
            await axios.put(`http://localhost:5000/api/videos/${editVideo._id}`, {
                title: editVideo.title,
                description: editVideo.description,
            });
            setMessage('Video updated successfully!');
            setEditVideo(null);
            fetchVideos();
        } catch (error) {
            setMessage(`Update failed: ${error.response?.data?.error || error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this video? This will remove it from Cloudinary and the database permanently.')) {
            try {
                await axios.delete(`http://localhost:5000/api/videos/${id}`);
                setMessage('Video deleted successfully from Cloudinary and MongoDB!');
                fetchVideos();
            } catch (error) {
                setMessage(`Delete failed: ${error.response?.data?.error || error.message}`);
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, p: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>Upload IPL Highlights</Typography>
                <form onSubmit={handleVideoUpload}>
                    <TextField fullWidth label="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" required />
                    <TextField fullWidth label="Video Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" multiline rows={4} required />
                    <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} style={{ margin: '20px 0', display: 'block' }} required />
                    {progress > 0 && (
                        <Box sx={{ width: '100%', mb: 2 }}>
                            <LinearProgress variant="determinate" value={progress} />
                            <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
                        </Box>
                    )}
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#ff6200' }} disabled={progress > 0 && progress < 100}>
                        Upload Video
                    </Button>
                </form>
                {message && <Typography sx={{ mt: 2, color: message.includes('success') ? 'green' : 'red' }}>{message}</Typography>}
                {videoUrl && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6">Uploaded Video Preview:</Typography>
                        <video width="100%" controls>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                )}

                <Typography variant="h5" sx={{ mt: 4 }}>Manage Videos</Typography>
                <Table sx={{ mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videos.map((video) => (
                            <TableRow key={video._id}>
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.description.substring(0, 50)}...</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(video)}><Edit /></IconButton>
                                    <IconButton onClick={() => handleDelete(video._id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Dialog open={!!editVideo} onClose={() => setEditVideo(null)}>
                {editVideo && (
                    <>
                        <DialogTitle>Edit Video</DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleEditSubmit}>
                                <TextField
                                    fullWidth
                                    label="Video Title"
                                    value={editVideo.title}
                                    onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Video Description"
                                    value={editVideo.description}
                                    onChange={(e) => setEditVideo({ ...editVideo, description: e.target.value })}
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    required
                                />
                                <DialogActions>
                                    <Button onClick={() => setEditVideo(null)}>Cancel</Button>
                                    <Button type="submit" variant="contained" sx={{ background: '#ff6200' }}>Save</Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default AdminDashboard;