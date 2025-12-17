import { Router } from 'express';
import { getTopHeadlines, getMultipleCategories, searchNews } from '../controllers/news.controller';

const router = Router();

router.get('/top-headlines', getTopHeadlines);
router.get('/multi-category', getMultipleCategories);
router.get('/search', searchNews);

export default router;
