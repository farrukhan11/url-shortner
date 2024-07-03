// routes/url.js
import { Router } from 'express';
import { generateNewUrl, getUrlAnalytics,visitUrl } from '../controllers/url.js';

const router = Router();

router.post('/shorten', generateNewUrl);
router.get('/:shortID' ,visitUrl)
router.get('/analytics/:shortID', getUrlAnalytics);

export default router;
