import express from 'express';
import ADD_NEWS_LETTER from './controllers/news-letter.controller';
const ROUTER = express.Router();

ROUTER.post('/', ADD_NEWS_LETTER);

export default ROUTER;
