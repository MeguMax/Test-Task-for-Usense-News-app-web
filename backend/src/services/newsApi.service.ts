import axios, { AxiosInstance } from 'axios';
import { NewsApiResponse } from '../types';

class NewsApiService {
    private client: AxiosInstance;
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.NEWS_API_KEY || '';

        if (!this.apiKey) {
            console.warn('Warning: NEWS_API_KEY is not set');
        }

        this.client = axios.create({
            baseURL: 'https://newsapi.org/v2',
            timeout: 10000,
        });
    }

    private getCategoryKeywords(category: string): string {
        const keywords: { [key: string]: string } = {
            general: 'news OR world OR latest',
            business: 'business OR economy OR finance OR stock',
            technology: 'technology OR tech OR AI OR software OR innovation',
            health: 'health OR medical OR healthcare OR medicine',
            sports: 'sports OR football OR basketball OR soccer OR tennis',
            entertainment: 'entertainment OR movies OR music OR celebrity OR hollywood',
            science: 'science OR research OR discovery OR space OR physics',
        };
        return keywords[category] || keywords['general'];
    }

    async getTopHeadlines(
        category: string,
        page: number = 1,
        pageSize: number = 12
    ): Promise<NewsApiResponse> {
        try {
            const query = this.getCategoryKeywords(category);

            const response = await this.client.get<NewsApiResponse>('/everything', {
                params: {
                    apiKey: this.apiKey,
                    q: query,
                    language: 'en',
                    sortBy: 'publishedAt',
                    page,
                    pageSize,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('NewsAPI Error:', error.response?.data || error.message);
            const message = error.response?.data?.message || 'Failed to fetch headlines';
            throw new Error(message);
        }
    }

    async getMultipleCategories(
        categories: string[],
        page: number = 1,
        pageSize: number = 12,
        sortBy: 'publishedAt' | 'popularity' | 'relevancy' = 'publishedAt'
    ): Promise<NewsApiResponse> {
        try {
            const combinedQuery = categories
                .map(cat => `(${this.getCategoryKeywords(cat)})`)
                .join(' OR ');

            const response = await this.client.get<NewsApiResponse>('/everything', {
                params: {
                    apiKey: this.apiKey,
                    q: combinedQuery,
                    language: 'en',
                    sortBy,
                    page,
                    pageSize,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('NewsAPI Error:', error.response?.data || error.message);
            const message = error.response?.data?.message || 'Failed to fetch news';
            throw new Error(message);
        }
    }

    async searchNews(
        query: string,
        page: number = 1,
        pageSize: number = 12,
        sortBy: 'publishedAt' | 'popularity' | 'relevancy' = 'publishedAt'
    ): Promise<NewsApiResponse> {
        try {
            const response = await this.client.get<NewsApiResponse>('/everything', {
                params: {
                    apiKey: this.apiKey,
                    q: query,
                    page,
                    pageSize,
                    sortBy,
                    language: 'en',
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Search API Error:', error.response?.data || error.message);
            const message = error.response?.data?.message || 'Search failed';
            throw new Error(message);
        }
    }
}

export default new NewsApiService();
