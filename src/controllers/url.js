import { nanoid } from 'nanoid';
import URL from '../models/url.model.js';

async function generateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).send({
            message: 'Please provide a valid URL'
        });
    }

    const shortID = nanoid(8);
    try {
        await URL.create({
            shortID,
            redirectUrl: body.url,
            visitHistory: []
        });
        return res.status(200).send({
            message: 'URL shortened successfully',
            shortID
        });
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while creating the short URL',
            error: error.message
        });
    }
}

async function visitUrl(req, res) {
    const shortID = req.params.shortID;
    try {
        const url = await URL.findOneAndUpdate(
            { shortID },
            {
                $push: {
                    visitHistory: {
                        date: new Date()
                    }
                }
            },
            { new: true } // Ensure to return the updated document
        );

        if (!url) {
            return res.status(404).send({
                message: 'URL not found'
            });
        }

        return res
            .status(200)
            .redirect(url.redirectUrl);
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while visiting the URL',
            error: error.message
        });
    }
}

async function getUrlAnalytics(req, res) {
    const shortID = req.params.shortID;
    try {
        const url = await URL.findOne({ shortID });
        if (!url) {
            return res.status(404).send({
                message: 'URL not found'
            });
        }
        return res.status(200).send({
            message: 'URL analytics retrieved successfully',
            analytics: url.visitHistory.length
        });
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while retrieving the URL analytics',
            error: error.message
        });
    }
}

export {
    generateNewUrl,
    visitUrl,
    getUrlAnalytics
} 
