const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'ddbyqg5d0', // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // From Cloudinary dashboard
    api_secret: process.env.CLOUDINARY_API_SECRET, // From Cloudinary dashboard
});

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
connectDB();

const db = client.db('ipl_highlights');
const videosCollection = db.collection('videos');

// Get all videos
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await videosCollection.find().toArray();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Upload video metadata
app.post('/api/videos', async (req, res) => {
    const { title, description, videoUrl, thumbnail } = req.body;
    try {
        const result = await videosCollection.insertOne({
            title,
            description,
            videoUrl,
            thumbnail,
            createdAt: new Date().toISOString(),
        });
        res.status(201).json({ message: 'Video metadata saved', id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save video metadata' });
    }
});

// Edit video metadata
app.put('/api/videos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const result = await videosCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description, updatedAt: new Date().toISOString() } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json({ message: 'Video updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update video' });
    }
});

// Delete video from Cloudinary and MongoDB
app.delete('/api/videos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch video metadata to get the videoUrl
        const video = await videosCollection.findOne({ _id: new ObjectId(id) });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Extract public_id from videoUrl (e.g., "ipl-highlights/title-12345")
        const urlParts = video.videoUrl.split('/');
        const fileName = urlParts[urlParts.length - 1].split('.')[0]; // e.g., "title-12345"
        const publicId = `ipl-highlights/${fileName}`; // Folder + filename

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

        // Delete from MongoDB
        const result = await videosCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Video not found in MongoDB' });
        }

        res.json({ message: 'Video deleted successfully from Cloudinary and MongoDB' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete video', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});