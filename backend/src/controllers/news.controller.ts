import { Request, Response, NextFunction } from 'express';
import newsApiService from '../services/newsApi.service';

export const getTopHeadlines = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { category = 'general', page = '1', pageSize = '12' } = req.query;

        const data = await newsApiService.getTopHeadlines(
            category as string,
            parseInt(page as string),
            parseInt(pageSize as string)
        );

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const getMultipleCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { categories = 'general', page = '1', pageSize = '12', sortBy = 'publishedAt' } = req.query;

        const categoryArray = (categories as string).split(',');

        const data = await newsApiService.getMultipleCategories(
            categoryArray,
            parseInt(page as string),
            parseInt(pageSize as string),
            sortBy as 'publishedAt' | 'popularity' | 'relevancy'
        );

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const searchNews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { q, page = '1', pageSize = '12', sortBy = 'publishedAt' } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Search query is required',
            });
        }

        const data = await newsApiService.searchNews(
            q as string,
            parseInt(page as string),
            parseInt(pageSize as string),
            sortBy as 'publishedAt' | 'popularity' | 'relevancy'
        );

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};
