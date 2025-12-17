import axios from 'axios';
import { NewsResponse, ApiResponse, SortOption } from '../types/news.types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const newsApi = {
    getTopHeadlines: async (
        category: string = 'general',
        page: number = 1,
        pageSize: number = 12
    ): Promise<NewsResponse> => {
        const response = await apiClient.get<ApiResponse<NewsResponse>>('/news/top-headlines', {
            params: { category, page, pageSize },
        });

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.error || 'Failed to fetch news');
        }

        return response.data.data;
    },

    getMultipleCategories: async (
        categories: string[],
        page: number = 1,
        pageSize: number = 12,
        sortBy: SortOption = 'publishedAt'
    ): Promise<NewsResponse> => {
        const response = await apiClient.get<ApiResponse<NewsResponse>>('/news/multi-category', {
            params: {
                categories: categories.join(','),
                page,
                pageSize,
                sortBy
            },
        });

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.error || 'Failed to fetch news');
        }

        return response.data.data;
    },

    searchNews: async (
        query: string,
        page: number = 1,
        pageSize: number = 12,
        sortBy: SortOption = 'publishedAt'
    ): Promise<NewsResponse> => {
        const response = await apiClient.get<ApiResponse<NewsResponse>>('/news/search', {
            params: { q: query, page, pageSize, sortBy },
        });

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.error || 'Search failed');
        }

        return response.data.data;
    },
};
