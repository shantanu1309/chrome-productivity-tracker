const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/focusTracker')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Mongo Error:", err));

// 2. Define the Schema
const Activity = mongoose.model('Activity', new mongoose.Schema({
    domain: String,
    duration: Number, // seconds
    category: String,
    timestamp: { type: Date, default: Date.now }
}));

// 3. The API Endpoint
app.post('/api/activity', async (req, res) => {
    try {
        const { domain, duration } = req.body;
        
        // Simple classifier logic
        const productive = ['github.com', 'stackoverflow.com', 'docs.google.com', 'vscode'];
        const unproductive = ['facebook.com', 'instagram.com', 'twitter.com', 'youtube.com'];

        let category = 'Neutral';
        if (productive.some(s => domain.includes(s))) category = 'Productive';
        else if (unproductive.some(s => domain.includes(s))) category = 'Unproductive';

        const entry = new Activity({ domain, duration, category });
        await entry.save();
        res.status(201).json({ message: "Logged successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Add this route in server.js
app.get('/api/stats', async (req, res) => {
    try {
        const logs = await Activity.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get('/api/weekly-stats', async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const stats = await Activity.aggregate([
            { $match: { timestamp: { $gte: lastWeek } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    productiveTime: {
                        $sum: { $cond: [{ $eq: ["$category", "Productive"] }, "$duration", 0] }
                    },
                    totalTime: { $sum: "$duration" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));