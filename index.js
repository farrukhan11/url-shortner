// index.js
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/db.connect.js';
import urlRouter from './src/routes/url.js';

const app = express();

dotenv.config({ path: './.env' });

const port = process.env.PORT || 3000;

// app.use(express.json());

app.use('/url', urlRouter); // Mount the urlRouter under /url route

// GET endpoint to handle short URLs
connectDB()
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err.message);
    });
