// index.js
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/db.connect.js';
import urlRouter from './src/routes/url.js';
import URL from './src/models/url.model.js';
const app = express();

dotenv.config({ path: './.env' });

const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.use('/', urlRouter);
app.get('/test', async (req, res) => {
    const urls = await URL.find({})
    res.render('home', { urls })
});

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
