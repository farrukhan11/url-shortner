// models/url.model.js
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    redirectUrl: {
        type: String,
        required: true
    },
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    visitHistory: [{
        ip: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const URL = mongoose.model('Url', urlSchema);

export default URL;
